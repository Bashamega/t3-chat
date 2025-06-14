import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    clerkId: v.string(),
    imageUrl: v.optional(v.string()),
  }),
  messages: defineTable({
    content: v.string(),
    userId: v.string(),
    clerkId: v.string(),
    createdAt: v.number(),
  }),
}); 