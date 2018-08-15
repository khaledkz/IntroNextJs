import Layout from '../components/MyLayout.js'
import Link from 'next/link'
import "isomorphic-fetch"

const PostLink = (props) => (
    <Link as={`/p/${props.id}`} href={`/post?id=${props.id}`}>
        <div>
        <a>{props.title}</a>
        <style jsx>{`a{text-decoration:none; cursor:pointer;} a:hover{color:green;}`}</style>
        </div>
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
            <style jsx global>{`
      h1, a {
        font-family: "Arial";
      }

      ul {
        padding: 0;
      }

      li {
        list-style: none;
        margin: 5px 0;
      }

      a {
        text-decoration: none;
        color: blue;
        cursor:pointer;
      }

      a:hover{
        opacity: 0.6;
      }
    `}</style>
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