import Layout from '../components/MyLayout.js'
import fetch from 'isomorphic-unfetch'
import Markdown from 'react-markdown'

const Post = (props) => (
  <Layout>
    <div>
      <h1>{props.show.name}</h1>
      <p>{props.show.summary.replace(/<[/]?p>/g, '')}</p>
      <img src={props.show.image.medium} /> </div>

{/* Using Markdown component and style it  */}
    <div className="markdown">
     <Markdown source={`
  This is our blog post.
  Yes. We can have a [link](/link).
  And we can have a title as well.

  ### This is a title

  And here's the content.
     `}/>
   </div>
       
    <style jsx>

      {`
          div{
            width:60%;
            border:solid 1px silver;
            margin:40px 20% 10px 20%;
            display:flex;
            flex-direction:column;
            justify-content:center; 
            align-items:center;
            min-height:600px;
           }
          p{
              width:90%
          }
          .markdown {
            font-family: 'Arial';
          }
     
          .markdown a {
            text-decoration: none;
            color: blue;
          }
     
          .markdown a:hover {
            opacity: 0.6;
          }
     
          .markdown h3 {
            margin: 0;
            padding: 0;
            text-transform: uppercase;
          }
        `}
    </style>
  </Layout>
)

Post.getInitialProps = async function (context) {
  console.log('print only in server')
  const { id } = context.query
  const res = await fetch(`https://api.tvmaze.com/shows/${id}`)
  const show = await res.json()

  console.log(`Fetched show: ${show.name}`)

  return { show }
}

export default Post