import { groq } from "@ai-sdk/groq";
import { streamText } from "ai";
import { NextResponse } from "next/server";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

// Periksa environment variable
if (!process.env.GROQ_API_KEY) {
  console.warn("GROQ_API_KEY tidak diatur. API chat tidak akan berfungsi dengan benar.");
}

export async function POST(req: Request) {
  try {
    // Extract the messages from the body of the request
    const { messages } = await req.json();

    // Validasi pesan
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Format pesan tidak valid" },
        { status: 400 }
      );
    }

    // Log request untuk debugging
    console.log(`Chat request received with ${messages.length} messages`);

    try {
      // Call the language model with Groq
      const result = await streamText({
        model: groq("llama-3.3-70b-versatile"),
        messages,
        onError: (error) => {
          console.error("AI model error:", error);
        },
      });

      // Respond with the stream
      return result.toDataStreamResponse();
    } catch (modelError) {
      console.error("Groq model error:", modelError);
      return NextResponse.json(
        { error: "Terjadi kesalahan saat berkomunikasi dengan model AI" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Chat API error:", error);
    // Coba dapatkan message dari error jika tersedia
    let errorMessage = "Terjadi kesalahan saat memproses permintaan Anda";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
