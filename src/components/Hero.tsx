
export function Hero() {
    return (
        <div className="flex items-center justify-center my-8 max-w-2xl mx-auto px-4" >
           <div className="flex flex-col space-y-1.5 max-w-lg">
             <h1 className="text-5xl font-bold">Hi, I'm <span className="text-primary">Syed Ahmed</span></h1>
             <p className=" text-muted-foreground">I'm a software engineer with a passion for building web applications.</p>
           </div>
           <div className="mx-auto">
                <img src="Syed.jpg" className="w-32 h-32 rounded-full" alt="Syed" />
            </div>
        </div>
    )
}