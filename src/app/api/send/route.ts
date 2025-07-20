import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: Request) {
    const { name, email, description } = await req.json();
    const resend = new Resend(process.env.RESEND_API_KEY)

    try {
        const html = `
        <h2>New Estimate Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Description:</strong></p>
        <p>${description}</p>
        `;
        const {data} = await resend.emails.send({
            from: 'masterBuilder <onboarding@resend.dev>', 
            to: 'masterbuildercanada@outlook.com', 
            subject: 'New Estimate Request', 
            html
        }) 
        return NextResponse.json({success: true, data})
    } catch (error) {
        console.error('Email sending error:', error);
        return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }
    
}