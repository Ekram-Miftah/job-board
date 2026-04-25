import { auth } from "@/auth";

import { NextResponse } from "next/server";

export async function PATCH(req:Request,{params}:{params:{id:string}}){
    try {
        const session=await auth();
        if(!session||session.user.role!=="EMPLOYER"){
            return NextResponse.json(
                {error:"Unauthorized"},
                {status:401}
            )
        }
        const {status}=await req.json();

        if 
        
    } catch (error) {
        
    }
}