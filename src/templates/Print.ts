export const PrintTemplate = <E extends Element>(content: React.RefObject<E>) => {
    if (content && content.current) {
        const finalContent = content.current.innerHTML;
        return (
            `<html>
                <head>
                    <title></title>
                </head>
                <body>
                    ${finalContent}
                </body>
            </html>`
        )
    } else {
        return ''
    }
}
