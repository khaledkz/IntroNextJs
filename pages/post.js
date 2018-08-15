import Layout from '../components/MyLayout.js'
import fetch from 'isomorphic-unfetch'

const Post =  (props) => (
    <Layout>
        <div>
       <h1>{props.show.name}</h1>
       <p>{props.show.summary.replace(/<[/]?p>/g, '')}</p>
       <img src={props.show.image.medium}/> </div>
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