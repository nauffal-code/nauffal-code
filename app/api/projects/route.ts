import { NextResponse } from "next/server";
import { projects } from "@/data/project_data";

export async function GET() {
  return NextResponse.json(projects);
}
