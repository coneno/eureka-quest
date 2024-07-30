import { CheckCircle } from "lucide-react";

export default function Page() {

    return (
        <main
            className="flex-1 h-screen flex flex-col items-center justify-center"
            role="main"
            id="main"
            tabIndex={-1}
        >
            <div className="flex flex-col items-center justify-center max-w-md">

                <h1 className="text-3xl font-bold mb-4 flex items-center justify-center gap-6">
                    <div className="">
                        <CheckCircle className='size-12 text-primary' />
                    </div>
                    Success!</h1>
                <p className="text-lg">You have successfully completed the survey.</p>
                <p className="text-lg">Thank you for your participation!</p>
            </div>
        </main>
    );
}
