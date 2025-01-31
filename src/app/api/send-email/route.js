import { NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function POST(req) {
    try {
        const { to, full_name } = await req.json();

        const msg = {
            to,
            from: "andres.bonilla@qallta.com",
            templateId: process.env.SENDGRID_TEMPLATE_ID,
            dynamicTemplateData: { full_name },
        };

        await sgMail.send(msg);

        return NextResponse.json({ success: true, message: "Email sent!" });
    } catch (error) {
        return NextResponse.json(
            { success: false, message: "Error sending email", error },
            { status: 500 }
        );
    }
}
