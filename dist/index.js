var Connect = /** @class */ (function () {
    function Connect(baseUrl, clientKey) {
        this.$baseUrl = baseUrl;
        this.$clientKey = clientKey;
        this.$loginUrl = this.$baseUrl + "/connect/autorization_form?clientKey=" + this.$clientKey;
    }
    Connect.prototype.getLoginUrl = function () {
        if (null !== this.getParam('api_key')) {
            return this.$loginUrl + '&api_key=' + this.getParam('api_key');
        }
        return this.$loginUrl;
    };
    Connect.prototype.userAuthorizationValid = function () {
        this.$token = this.getParam('token');
        return (this.$token !== null);
    };
    Connect.prototype.userRevokeAuthorization = function (token) {
        var url = this.$baseUrl + "/connect/user/delete-token?clientKey=" + this.$clientKey + "&token=" + token;
        return new Promise(function (resolve, reject) {
            axios.get(url)
                .then(function (r) {
                resolve(null);
            }).catch(function (e) {
                reject(e);
            });
        });
    };
    Connect.prototype.getUserToken = function () {
        return this.$token;
    };
    Connect.prototype.getUser = function () {
        var url = this.$baseUrl + "/connect/user?clientKey=" + this.$clientKey + "&token=" + this.$token;
        return new Promise(function (resolve, reject) {
            axios.get(url)
                .then(function (r) {
                resolve(r.data);
            }).catch(function (e) {
                reject(e);
            });
        });
    };
    Connect.prototype.getParam = function (name) {
        var urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    };
    return Connect;
}());
