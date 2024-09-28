import { hashPassword, verifyPassword } from "@/utils/password/password";
import {
  db,
  movieRecord,
  movies,
  memberInsert,
  movieInsert,
  memberDataInsert,
  memberDataRecord,
  membersData,
  members,
  memberRecord,
} from "@/utils/postgres";
import { eq, and } from "drizzle-orm";
import { DatabaseError } from "pg";

class LtdRepo {
  // movie CRUD
  async getMovies(): Promise<movieRecord[]> {
    return await db.select().from(movies);
  }
  async getMovieById(id: number): Promise<movieRecord[]> {
    return await db.select().from(movies).where(eq(movies.id, id));
  }
  async createMovie(movie: movieInsert): Promise<void> {
    await db.insert(movies).values(movie);
  }
  async updateMovie(movie: movieRecord): Promise<movieRecord[]> {
    return await db
      .update(movies)
      .set({
        name: movie.name,
        releaseDate: movie.releaseDate,
        posterName: movie.posterName,
        description: movie.description,
      })
      .where(eq(movies.id, movie.id))
      .returning();
  }
  async deleteMovie(id: number): Promise<void> {
    await db.delete(movies).where(eq(movies.id, id));
  }

  async getMemberById(id: number): Promise<memberRecord[]> {
    return await db.select().from(members).where(eq(members.id, id));
  }

  async createMember(
    member: memberInsert
  ): Promise<{ success: boolean; message: string }> {
    try {
      const passwordHash = await hashPassword(member.passwordHash);
      const newObj = { ...member, passwordHash };
      const createResult = await db.insert(members).values(newObj);
      if (createResult.rowCount === 0) {
        return { success: false, message: "Failed to create the user" };
      }
    } catch (error) {
      if (error instanceof DatabaseError) {
        // PostgreSQL error code for unique_violation is '23505'
        if (error.code === "23505") {
          return {
            success: false,
            message: "Same account with email or username already exists",
          };
        }
        // If it's not a unique constraint violation, re-throw the original error
        return { success: false, message: "Unexpected error happened" };
      }
    }
    return { success: true, message: "Created the user" };
  }

  async updateMemberPassword(
    email: string,
    password: string
  ): Promise<{ success: boolean; message: string }> {
    try {
      // Validate input
      if (!email || !password) {
        return { success: false, message: "Email and password are required" };
      }

      // Check password strength (example)
      if (password.length < 8 || password.length > 15) {
        return {
          success: false,
          message: "Password must be between 8 and 15 characters long",
        };
      }

      const [{ userId }] = await db
        .select({ userId: members.id })
        .from(members)
        .where(eq(members.email, email));

      if (userId) {
        const hashedPassword = await hashPassword(password);
        const updateResult = await db
          .update(members)
          .set({ passwordHash: hashedPassword })
          .where(eq(members.id, userId));

        if (updateResult.rowCount === 0) {
          return { success: false, message: "Failed to update password" };
        }
      } else {
        return { success: false, message: "User not found" };
      }
      return { success: true, message: "Password updated successfully" };
    } catch (error) {
      if (error instanceof DatabaseError) {
        switch (error.code) {
          case "23505": // unique_violation
            return { success: false, message: "Duplicate key violation" };
          case "23503": // foreign_key_violation
            return { success: false, message: "Foreign key violation" };
          case "42P01": // undefined_table
            return { success: false, message: "Table does not exist" };
          default:
            console.error("Database error:", error);
            return {
              success: false,
              message: "An unexpected database error occurred",
            };
        }
      } else if (error instanceof Error) {
        // Handle custom errors thrown in the try block
        return { success: false, message: error.message };
      } else {
        // Handle any other unexpected errors
        console.error("Unexpected error:", error);
        return { success: false, message: "An unexpected error occurred" };
      }
    }
  }

  async checkMember(
    userName: string,
    password: string
  ): Promise<null | boolean> {
    const userInfo = await db
      .select()
      .from(members)
      .where(eq(members.username, userName));
    if (userInfo[0]) {
      return await verifyPassword(password, userInfo[0].passwordHash);
    } else {
      return null;
    }
  }

  // member_data CRUD

  async getMemberDataByMemberId(memberId: number): Promise<memberDataRecord[]> {
    // mayb optimize to take only some data just to display
    return await db
      .select()
      .from(membersData)
      .where(eq(membersData.memberId, memberId));
  }

  async getMemberDataByMemberIdNMovieId(
    memberId: number,
    movieId: number
  ): Promise<memberDataRecord[]> {
    return await db
      .select()
      .from(membersData)
      .where(
        and(
          eq(membersData.memberId, memberId),
          eq(membersData.movieId, movieId)
        )
      );
  }

  async upsertMemberData(
    memberData: memberDataInsert
  ): Promise<memberDataRecord[]> {
    return await db
      .insert(membersData)
      .values(memberData)
      .onConflictDoUpdate({
        target: [membersData.memberId, membersData.movieId],
        set: {
          liked: memberData.liked,
          firstTime: memberData.firstTime,
          score: memberData.score,
          review: memberData.review,
          watchedDate: memberData.watchedDate,
        },
      })
      .returning();
  }
}

export const ltdRepo = new LtdRepo();
