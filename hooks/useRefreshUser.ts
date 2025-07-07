import { useEffect, useState } from "react";
import { fetch } from 'expo/fetch';

export function useRefreshUser() {

    const [loading, setLoading] = useState<boolean|null>(null);
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch('http://localhost/3000/auth/refresh', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer {token aqui}'
            },
            body: JSON.stringify({object: 'aqui'})
        }).then(
            response => response.json()
        ).then(
            data => {setData(data)
            setLoading(false)}).catch(
            error => {console.error('ERROR: ', error);
            setLoading(false)}
        )
    }, []);
    return {data, loading}

}