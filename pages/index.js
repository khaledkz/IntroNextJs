import Link from 'next/link'

const Index = () => (
    <div>
        <Link href="/about" ><a><li style={{ display: 'flex', margin: 40 ,fontSize:20}}>About</li></a></Link>
        <p>Hello Next.js</p>
    </div>
)

export default Index