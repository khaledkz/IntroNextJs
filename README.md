# IntroNextJs
Introduction to Next Js


# Handling Errors

By default, Next.js will track errors and show it in the browser. This helps you identify errors and fix them quickly.

Once you fix the issue, the page will appear instantly without a full page reload. We do this with the help of Webpack's hot module replacement facility, which is supported in Next.js by default.

# Link

## We Can use Link to navigate between pages 
```
<Link href="/"> <a> </a> </Link>
```

# Style Link
Actually, the style prop on next/link has no effect. That's because next/link is just a higher order component which only accepts the "href" and some similar props. If you need to style it, you need to do it to the underlying component.
In this case, it's our anchor.

# Link Works With Anything
Just like a button, you can place any of your custom React components or even a div within a Link.
The only requirement for components placed inside a Link is they should accept an onClick prop.

# Render Layout Component with children elements 

we put inside the Layout element 

```
const Layout = (props) => (
  <div style={layoutStyle}>
    <Header />
    {props.children}
  </div>
)
```

If you remove {props.children}, the Layout cannot render the content 

# Read Data Froy Query 

1-we need to create a post page 
2-we need to import withRouter

```
import {withRouter} from 'next/router'
```

3-we need to pass the props inside withRouter

```
const Content = withRouter((props) => 
(
   <div>
    <h1>{props.router.query.title}</h1>
    <p>This is the blog post content.</p>
  </div>
))
```

# Clean URLs with Route Masking
## as

In the <Link> element, we have used another prop called “as”. That's the URL which we need to show on the browser. The URL your app sees is mentioned in the “href” prop.

```
const PostLink = (props) => (
  <li>
    <Link as={`/p/${props.id}`} href={`/post?title=${props.title}`}>
      <a>{props.title}</a>
    </Link>
  </li>
)
```

route masking works pretty nicely with the browser history.
All you have to do is just add the “as” prop for the link.

```
<PostLink id="hello-nextjs" title="Hello Next.js" />
```

### if we Reload the browser:

It will throw a 404 error.
 
Next.js's **custom server API** is the solution for this problem.


Create route in server to handle the mask routes 

```
 server.get('/p/:id', (req, res) => {
            const actualPage = '/post'
            const queryParams = { title: req.params.id }
            app.render(req, res, actualPage, queryParams)
        })
```

it's work fine in this case but we will have an issue if we refresh the page the title will be the params id so the title will change in this case

# getInitialProps

```
Index.getInitialProps = async function () {
    const res = await fetch('https://api.tvmaze.com/search/shows?q=batman')
    const data = await res.json()

    console.log(`Show data fetched. Count: ${data.length}`)
     return {
        shows: data
    }
}
```

Fetching Data for Pages and if you print console it display it Only on the Server

In this case, the message only printed on the server.

That's because we render the page on the server.
So, we already have the data and there is no reason to fetch it again in the client.


so in server we use this route 

```
server.get('/p/:id', (req, res) => {
            console.log(req.params)
            const actualPage = '/post'
            const queryParams = { id: req.params.id }
            app.render(req, res, actualPage, queryParams)
        })
```
to pass the queryparams in the url the mask query will appear so it will stay nice and tidey 

# Styling Components in Next

```
<style jsx>
  {`
    a{color:red; font-size:1.4em;}
    ul {
        padding: 0;
      }
  `}
</style>
```

### Styles should go inside template strings
 
Styled jsx works as a babel plugin. It will parse all of the CSS and apply it in the build process. (With that our styles get applied without any overhead time)

It also supports having constraints inside styled-jsx. In the future, we will be able to use any dynamic variable inside styled-jsx. That is why CSS needs to go inside of a template string. 
```
({``})
```

# No Effect for Nested Component

jsx CSS rules have no effect on elements inside of a child component.

This feature of styled-jsx helps you to manage styles for bigger apps.

In that case, you need to style the child component directly. And in our particular case, we need to use global selectors.

```
   <style jsx global>{`
  `}
  </style>
```

