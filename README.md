# IntroNextJs
Introduction to Next Js


# Handling Errors

By default, Next.js will track errors like these and show it in the browser. This helps you identify errors and fix them quickly.

Once you fix the issue, the page will appear instantly without a full page reload. We do this with the help of Webpack's hot module replacement facility, which is supported in Next.js by default.

Link

# We Can use Link to navigate between pages 
<Link href="/"> <a> </a> </Link>

# Style Link
Actually, the style prop on next/link has no effect. That's because next/link is just a higher order component which only accepts the "href" and some similar props. If you need to style it, you need to do it to the underlying component.
In this case, it's our anchor.

