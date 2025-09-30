"use server"

import { z } from "zod"
import { generateBioOptions } from "@/ai/flows/generate-bio-options"

// Contact Form Action
const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
})

export async function sendContactMessage(prevState: any, formData: FormData) {
  const validatedFields = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Validation failed.",
    }
  }

  try {
    // Here you would implement your email sending logic.
    // For this example, we'll just log it to the console and simulate a delay.
    console.log("New contact message received:")
    console.log(validatedFields.data)
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return { success: true, message: "Thank you for your message! I'll get back to you soon." }
  } catch (error) {
    console.error("Error sending message:", error)
    return { success: false, message: "Something went wrong. Please try again." }
  }
}


// Bio Generator Action
const bioSchema = z.object({
    keywords: z.string().min(3, "Please enter at least 3 characters."),
});

export async function generateBio(keywords: string) {
    const validatedFields = bioSchema.safeParse({ keywords });

    if (!validatedFields.success) {
        return {
            error: validatedFields.error.flatten().fieldErrors.keywords?.[0],
        };
    }

    try {
        const result = await generateBioOptions({ keywords });
        if (result && result.bioOptions) {
            return { bioOptions: result.bioOptions };
        }
        return { error: "Failed to generate bio options. No output." };
    } catch (e) {
        console.error(e);
        return { error: "An unexpected error occurred while generating bios." };
    }
}
