import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";

export async function POST(
    req: Request,
){
    try {
        const {userId} = auth();
        const body =  await req.json();

        const {name} = body;

        const store = await prismadb.store.create({
            data: {
                name,
                userId
            }
        }); 

        return NextResponse.json(store);

        if(!name){
            return new NextResponse("O nome é obrigatório", {status: 400})
        }

        if(!userId) {
            return new NextResponse("Não autorizado", {status: 401})
        }
    } catch (error) {
        console.log('[STORES_POST]', error);
        return new NextResponse("Erro interno", {status: 500})
    }
}