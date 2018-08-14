import Link from 'next/link'

export default () => (
    <div>
        <Link href="/"><a><li style={{ display: 'flex', margin: 40, fontSize: 20 }} >Home</li></a></Link>
        <p>This is the about page</p>
        <Link href="/">
            <button>Go to Home Page</button>
        </Link>
    </div>
)