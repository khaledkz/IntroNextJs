import Layout from '../components/MyLayout.js'
import Link from 'next/link'
import "isomorphic-fetch"

const PostLink = (props) => (
    <Link as={`/p/${props.id}`} href={`/post?id=${props.id}`}>
        <a>{props.title}</a>
    </Link>

)

const Index = (props) => (
    <div>
        <Layout>
            <h1>My Blog</h1>
            <ul>
                {props.shows.map((show, i) => (<li key={show.show.id}>
                    <PostLink id={show.show.id} title={show.show.name} />
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