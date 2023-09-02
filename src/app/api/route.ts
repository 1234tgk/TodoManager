import { NextResponse as res } from 'next/server'

export async function GET(request: Request) {
    return res.json("Hello World!");
}