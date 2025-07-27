import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import LinkPreview from './link-preview';

interface MyMarkdownProps {
    content: string;
}

export default function MyMarkdown({ content }: MyMarkdownProps) {
    let mountedUrl: any[] = [];
    const renderers = {
        // 테이블 관련 커스텀 렌더러를 추가
        table: ({ node, children, ...props }: any) => (
            <table className="m-4" style={{ borderCollapse: 'collapse', width: '60%', border: '1px solid #ddd' }} {...props}>
                {children}
            </table>
        ),
        thead: ({ node, children, ...props }: any) => (
            <thead style={{ border: '1px solid #ddd' }} {...props}>
                {children}
            </thead>
        ),
        tbody: ({ node, children, ...props }: any) => (
            <tbody style={{ border: '1px solid #ddd' }} {...props}>
                {children}
            </tbody>
        ),
        tr: ({ node, children, ...props }: any) => (
            <tr style={{ border: '1px solid #ddd' }} {...props}>
                {children}
            </tr>
        ),
        th: ({ node, children, ...props }: any) => (
            <th className="text-center" style={{ border: '1px solid #ddd', padding: '8px'}} {...props}>
                {children}
            </th>
        ),
        td: ({ node, children, ...props }: any) => (
            <td className="text-center" style={{ border: '1px solid #ddd', padding: '8px' }} {...props}>
                {children}
            </td>
        ),
        // 단락 렌더러를 커스텀하여, 자식이 단 하나이고 링크이면 언랩
        p: ({ node, children, ...props }: any) => {
            if (
                node.children &&
                node.children.length === 1 &&
                node.children[0].tagName === 'a'
            ) {
                return <>{children}</>;
            }
            return <div {...props}>{children}</div>;
        },
        a: ({ href, children, ...props }: any) => {
            if (href && (href.startsWith('http://') || href.startsWith('https://'))) {
                if (!mountedUrl.includes(href)) {
                    mountedUrl.push(href);
                    return <LinkPreview url={href} />;
                }
            } else {
                return <a href={href} {...props}>{children}</a>;
            }
        },    
    };
    return (
        <ReactMarkdown            
            rehypePlugins={[rehypeRaw]}
            remarkPlugins={[remarkGfm]}
            components={renderers}            
        >
            {content}
        </ReactMarkdown>
    );
}