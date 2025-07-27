import { getOg } from '@/lib/api';
import React, { useState, useEffect } from 'react';
import { decode } from 'html-entities';

interface LinkPreviewProps {
    url: string;
}

interface LinkMeta {
    title: string;
    description: string;
    image: string;
}

const LinkPreview: React.FC<LinkPreviewProps> = ({ url }) => {
    const [meta, setMeta] = useState<LinkMeta | null>(null);

    useEffect(() => {
        if (!url) return;
        // URL이 같은 경우에는 다시 호출되지 않음
        let isMounted = false;
        async function fetchMeta() {
            try {
                console.log(url, isMounted);
                const data = await getOg(url);
                if (!isMounted) {
                    isMounted = true;
                    setMeta(data);
                }
            } catch (error) {
                console.error('링크 미리보기 정보를 가져오는데 실패:', error);
            }
        }
        fetchMeta();
        return () => { isMounted = false; };
    }, [url]);

    if (!meta) {
        return <a href={url} target="_blank" rel="noopener noreferrer">{url}</a>;
    }

    return (
        <div style={{ border: '1px solid #ddd', padding: '10px', maxWidth: '400px' }}>
            {meta.image && (
                <a href={url} target="_blank" rel="noopener noreferrer">
                    <img
                        src={meta.image}
                        alt={decode(meta.title)}
                        style={{ width: '100%', objectFit: 'cover', marginBottom: '10px' }}
                    />
                </a>
            )}
            <div>
                <a href={url} target="_blank" rel="noopener noreferrer">
                    <div style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '5px' }}>
                        {decode(meta.title)}
                    </div>
                    <div style={{ fontSize: '0.875rem', color: '#555' }}>
                        {decode(meta.description)}
                    </div>
                </a>
            </div>
        </div>
    );
};

export default LinkPreview;