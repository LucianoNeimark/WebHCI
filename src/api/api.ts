export class Api {
    static get baseUrl() {
        return `${import.meta.env.VITE_API_BASE_URL}:${import.meta.env.VITE_API_PORT}/api` 
    }

    static fetchApi(path: string | URL, init = {}): Promise<Response> {
        try {
            return fetch(new URL(`${Api.baseUrl}${path}`), init)
        } catch(error) {
            console.error(error)
            return Promise.reject(error)
        }
    }

    static get(path: string): Promise<Response> {
        return Api.fetchApi(path, {
                method: "GET",
        });
    }

    static post(path: string, data = {}): Promise<Response> {
        return Api.fetchApi(path, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json; charset=utf8"
            },
            body: JSON.stringify(data)
        })
    }

    static put(path: string, data: any): Promise<Response> {
        return Api.fetchApi(path, {
            method: "PUT",
            headers: {
                "Content-Type" : "application/json; charset=utf8"
            },
            body: JSON.stringify(data)

        })
    }

    static delete(url: string): Promise<Response> {
        return Api.fetchApi(url, {
            method: "DELETE",
            headers: {
                "Content-Type" : "application/json; charset=utf8"
            }
        })
    }

}