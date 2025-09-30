"use client";

import { useState } from "react";
import { generateBio } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Wand2, Loader, Copy, Check } from "lucide-react";

export function BioGenerator() {
  const [keywords, setKeywords] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [bioOptions, setBioOptions] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setBioOptions([]);
    
    const result = await generateBio(keywords);
    
    if (result.error) {
      setError(result.error);
    } else if (result.bioOptions) {
      setBioOptions(result.bioOptions);
    }
    
    setIsLoading(false);
  };

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            placeholder="Enter keywords e.g., 'full-stack developer, React, cloud computing'"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            className="min-h-[100px]"
          />
          <Button type="submit" disabled={isLoading || !keywords} className="w-full sm:w-auto">
            {isLoading ? (
              <Loader className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Wand2 className="mr-2 h-4 w-4" />
            )}
            Generate Bio
          </Button>
        </form>

        {error && <p className="mt-4 text-sm text-destructive">{error}</p>}

        {isLoading && (
          <div className="mt-6 grid gap-4 sm:grid-cols-1 md:grid-cols-3">
            {[...Array(3)].map((_, i) => (
                <div key={i} className="p-4 border rounded-lg bg-muted/50 animate-pulse h-48"></div>
            ))}
          </div>
        )}
        
        {bioOptions.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4 text-center">Your Generated Bios</h3>
            <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-3">
              {bioOptions.map((bio, index) => (
                <Card key={index} className="flex flex-col">
                  <CardContent className="p-4 flex-grow">
                    <p className="text-sm text-muted-foreground">{bio}</p>
                  </CardContent>
                  <CardFooter className="p-2 border-t">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full"
                      onClick={() => handleCopy(bio, index)}
                    >
                      {copiedIndex === index ? (
                        <Check className="mr-2 h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="mr-2 h-4 w-4" />
                      )}
                      {copiedIndex === index ? 'Copied!' : 'Copy'}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
