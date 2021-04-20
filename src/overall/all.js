exports.install = function(Vue, options) {
    Vue.prototype.$back = function(title,message,type) { //全局函数1
        this.$notify({
            title: title,
            message: message,
            type: type
        });
    };


};