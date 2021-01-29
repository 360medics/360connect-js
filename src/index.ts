declare var axios: any

class Connect
{
    $baseUrl: string
    $clientKey: string
    $loginUrl: string
    $token: string
    $user: any
    
    constructor(baseUrl: string, clientKey: string) {
        this.$baseUrl = baseUrl
        this.$clientKey = clientKey
        this.$loginUrl = `${this.$baseUrl}/connect/autorization_form?clientKey=${this.$clientKey}`
    }
    
    getLoginUrl() {
        if (null !== this.getParam('api_key')) {
            return this.$loginUrl + '&api_key=' + this.getParam('api_key')
        }
        
        return this.$loginUrl
    }

    userAuthorizationValid() {
        this.$token = this.getParam('token')
        return (this.$token !== null)
    }

    userRevokeAuthorization(token: string)
    {
        const url = `${this.$baseUrl}/connect/user/delete-token?clientKey=${this.$clientKey}&token=${token}`
        
        return new Promise((resolve, reject) => {
            axios.get(url)
                .then(r => {
                    resolve(null)
                }).catch(e => {
                    reject(e)
                })
        })
    }

    getUserToken() {
        return this.$token
    }
    
    getUser() {
        const url = `${this.$baseUrl}/connect/user?clientKey=${this.$clientKey}&token=${this.$token}`

        return new Promise((resolve, reject) => {
            axios.get(url)
                .then(r => {
                    resolve(r.data)
                }).catch(e => {
                    reject(e)
                })
        })
    }

    getParam(name: string) {
        const urlParams = new URLSearchParams(window.location.search)
        return urlParams.get(name)
    }
}