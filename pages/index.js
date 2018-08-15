import Layout from '../components/MyLayout.js'
import Link from 'next/link'
import "isomorphic-fetch"

const PostLink = (props) => (
    <li>
        <Link as={`/p/${props.id}`} href={`/post?title=${props.title}`}>
            <a>{props.title}</a>
        </Link>
    </li>
)

const Index = (props) => (
    <div>
        <Layout>
            <h1>My Blog</h1>
            <ul>
                <PostLink id="hello-nextjs" title="Hello Next.js" />
                <PostLink id="learn-nextjs" title="Learn Next.js is awesome" />
                <PostLink id="deploy-nextjs" title="Deploy apps with Zeit" />

                {props.shows.map((show, i) => (<li key={show.show.id}>
                         <Link as={`/p/${show.show.id}`} 
                         href={`/post?title=${show.show.name}`}
                         >
                         <a>{show.show.name}</a>
                         </Link>
                 </li>))}
             </ul>
        </Layout>
    </div>
)

Index.getInitialProps = async function () {
    const res = await fetch('https://api.tvmaze.com/search/shows?q=batman')
    const data = await res.json()

    console.log(`Show data fetched. Count: ${data.length}`)
     return {
        shows: data
    }
}



export default Index