import Logo from 'public/assets/logo.svg';
import Landing from 'public/assets/landing.svg';
import Link from 'next/link';

export function Nav() {
    return (
        <div className="flex flex-row justify-between">
            <div className="flex flex-row">
                <div className="flex flex-col justify-center">
                    <Link href="/"><Logo width="2.75rem" height="4rem" /></Link>
                </div>
            </div>
            <div className="flex flex-row space-x-8">
                <div className="flex flex-col justify-center">
                    <Link href="/about"><div className="text-base hover:underline">About</div></Link>
                </div>
                <div className="flex flex-col justify-center">
                    <Link href="/login"><div className="text-base hover:underline">Login</div></Link>
                </div>
                <div className="flex flex-col justify-center">
                    <Link href="/signup"><div className="text-base font-semibold hover:underline">Sign up</div></Link>
                </div>
            </div>
        </div>
    )
}