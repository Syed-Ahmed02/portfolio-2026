import { ChatIcon, File01Icon, MailIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react"
import { Card, CardContent } from "@/components/ui/card";
export function Hero() {
    return (
        <div className=" space-y-6">
            <div className="flex items-center gap-6">
                <div>
                    <img src="Syed.jpg" className="w-32 h-32 rounded-full" alt="Syed" />
                </div>
                <div className="flex flex-col space-y-1.5 flex-1">
                    <h1 className="text-5xl font-bold">Hi, I'm <span className="text-primary">Syed Ahmed</span></h1>
                    <p className="text-muted-foreground">I'm a Full Stack AI Engineer with a passion for building scalable and efficient AI-powered applications.</p>
                </div>
            </div>
            <div className="flex flex-row gap-3 max-w-2xl">
                <Card className="flex flex-col  justify-center h-16 flex-1 cursor-pointer hover:bg-secondary transition-colors " >
                    <CardContent className="flex flex-col gap-1 justify-center p-4">
                        <HugeiconsIcon icon={ChatIcon} className="size-4" />
                        <span className="text-xs ">Chat with AI</span>
                    </CardContent>
                </Card>
                <Card className="flex flex-col  justify-center h-16 flex-1 cursor-pointer hover:bg-secondary transition-colors ">
                    <CardContent className="flex flex-col gap-1 justify-center p-4">
                        <HugeiconsIcon icon={MailIcon} className="size-4" />
                        <span className="text-xs ">Contact Me</span>
                    </CardContent>
                </Card>
                <Card className="flex flex-col  justify-center h-16 flex-1 cursor-pointer hover:bg-secondary transition-colors ">
                    <CardContent className="flex flex-col gap-1 justify-center p-4">
                        <HugeiconsIcon icon={File01Icon} className="size-4" />
                        <span className="text-xs ">View Resume</span>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}