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