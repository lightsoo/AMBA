define([], function () {
    return {
        run: function () {

            // dependency들을 읽어와 url을 설정합니다.
            var deps = JSON.parse(localStorage.getItem('adeps'))
            var urls = deps.map(function (dep) {
                return '/jsloader/' + dep;
            });
            require(urls, function () {
                // 서버로 부터 리턴받은 코드들이 수행되어 그 결과를 arguments로 받아옵니다.
                // 정상적으로 define을 써서 모듈화를 수행한 코드의 경우, return하는 object를 AB.module[name] 에 넣어줍니다.
                // 그렇지 않은 경우 (예를 들어 스크립트를 실행하여 함수만 정의하는 경우) AB.module[name] 에는 undefined가 들어갑니다.
                for (var i=0; i<arguments.length; i++) {
                    AB.module[deps[i]] = arguments[i];
                }

                // 모듈을 모두 설정한 뒤, 현재 코드를 실행시키기 위해 script tag를 추가합니다.
                var head = document.getElementsByTagName('head')[0];
                var script = document.createElement('script');
                var code = localStorage.getItem('acode');
                script.text = '(function(){' + code + '\n})();'; // get text from code editor and modularize it
                head.appendChild(script);
                localStorage.removeItem('acode');
                localStorage.removeItem('adeps');
            });
        }
    }
});