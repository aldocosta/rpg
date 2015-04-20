/// <reference path="angular.min.js" />
var mainApp = angular.module('mainApp', []);
mainApp.controller('rpgController', ['$scope', function ($scope) {

    var hub = $.connection.chatHub;

    hub.client.SendMessage = function (msg) {
        sendmsg(msg);
    };

    hub.client.AddUser = function (msg) {
        $scope.users.push({ name: msg });
        $scope.users.reverse();
        $scope.$digest();
    };

    hub.client.SetPosition = function (l, t, id) {
        $('#' + id).css({
            top: t + 'px', left: l + 'px'
        });
    }

    hub.client.SendKill = function (msg) {
        $(msg).hide();
    }

    hub.client.Clone = function (obj, src) {
        var span = document.createElement('span');
        $(span).addClass('glyphicon').addClass('glyphicon-remove');
        $(span).on('click', function () {

            hub.server.sendKill('#' + $(this).data('name'));
            //$('#'+$(this).data('name')).hide();
        });
        var div = document.createElement('div');
        $(div).draggable().css('position', 'absolute');

        var clone = $('#' + obj).clone();
        $(div).attr('id', src + clone.attr('id'));

        $(span).data('name', src + clone.attr('id'))

        //clone.draggable().css('position', 'absolute');
        $(div).on('mouseover', function () {
            $('#pos').text($(this).attr('id').split('_')[0]);
        });

        $(div).draggable({
            drag: function (e) {
                var pos = {
                    l: this.offsetLeft,
                    t: this.offsetTop
                };
                hub.server.setPosition(pos.l, pos.t, $(this).attr('id'));
                //$scope.$digest();
            }
        });
        $(div).append(clone);
        $(div).append(span);

        //clone.draggable({
        //    drag: function (e) {
        //        var pos = {
        //            l: this.offsetLeft,
        //            t: this.offsetTop
        //        };
        //        hub.server.setPosition(pos.l, pos.t, $(this).attr('id'));
        //        //$scope.$digest();
        //    }
        //});
        $('#iconbirth').append(div);
        //$scope.$digest();
    }

    var sendmsg = function (msg) {
        $scope.messages.push({ message: msg, d: new Date().getTime() });        
        $scope.$digest();
    }

    $.connection.hub.start().done(function () {
        $scope.sendMessage = function () {
            hub.server.sendMessage($scope.name + ' disse: ' + $scope.message);
            $scope.message = '';
            $scope.$digest();
        }

        $scope.addUser = function () {
            $scope.color = $scope.getRandomColor();
            $scope.backgroundcolor = $scope.getRandomColor();
            hub.server.addUser($scope.name);
            $scope.usuario = $scope.name;
            $scope.classentry = 'ocultar';
            $scope.classentrychat = 'mostrar';
            $scope.createIcons();
            $scope.$digest();
        }

        $scope.rund6 = function () {
            var ret = '';
            ret = $scope.usuario + ' tirou nos dados: ' + rundices($scope.d6times, 6, $scope.incrementod6);
            hub.server.sendMessage(ret);
            $scope.$digest();
        }

        $scope.rund8 = function () {
            var ret = '';
            ret = $scope.usuario + ' tirou nos dados: ' + rundices($scope.d8times, 8, $scope.incrementod8);
            hub.server.sendMessage(ret);
            $scope.$digest();
        }

        $scope.rund10 = function () {
            var ret = '';
            ret = $scope.usuario + ' tirou nos dados: ' + rundices($scope.d10times, 10, $scope.incrementod10);
            hub.server.sendMessage(ret);
            $scope.$digest();
        }

        $scope.rund12 = function () {
            var ret = '';
            ret = $scope.usuario + ' tirou nos dados: ' + rundices($scope.d12times, 12, $scope.incrementod12);
            hub.server.sendMessage(ret);
            $scope.$digest();
        }

        $scope.rund20 = function () {
            var ret = '';
            ret = $scope.usuario + ' tirou nos dados: ' + rundices($scope.d20times, 20, $scope.incrementod20);
            hub.server.sendMessage(ret);
            $scope.$digest();
        }

        $scope.clone = function (obj) {
            hub.server.clone(obj, $scope.usuario + '_');
            //$(pin).fadeOut();
        }

        var rundices = function (times, dice, incremento) {
            var ret = '';
            var sum = 0;
            for (var i = 0; i < times; i++) {
                var temp = Math.floor((Math.random() * dice) + 1) ;
                ret += temp + '-';
                sum += temp;
            }
            ret = ret.substring(0, ret.length - 1) + ' com incremento de (' + incremento + ') Total: (' + (sum + incremento)  + ')';
            return ret;
        }
    });

    $scope.createIcons = function () {
        $scope.$digest();
    }

    $scope.getRandomColor = function () {
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    $scope.createIcons = function () {
        $scope.images.push({ 'url': '/Content/Imagens/Animated_Zelda_Avatar_by_FieryCharry.gif', 'id': 'Animated_Zelda_Avatar_by_FieryCharry' });
        $scope.images.push({ 'url': '/Content/Imagens/bluebohrok.gif', 'id': 'bluebohrok' });
        $scope.images.push({ 'url': '/Content/Imagens/Ewan.gif', 'id': 'Ewan' });
        $scope.images.push({ 'url': '/Content/Imagens/fighter.gif', 'id': 'fighter' });
        $scope.images.push({ 'url': '/Content/Imagens/Genjurongpcss2.gif', 'id': 'Genjurongpcss2' });
        $scope.images.push({ 'url': '/Content/Imagens/hiei.gif', 'id': 'hiei' });
        $scope.images.push({ 'url': '/Content/Imagens/inuyasha.gif', 'id': 'inuyasha' });
        $scope.images.push({ 'url': '/Content/Imagens/mage.gif', 'id': 'mage' });
        $scope.images.push({ 'url': '/Content/Imagens/Nina.gif', 'id': 'Nina' });
        $scope.images.push({ 'url': '/Content/Imagens/paladin.gif', 'id': 'paladin' });
        $scope.images.push({ 'url': '/Content/Imagens/samurai.gif', 'id': 'samurai' });
        $scope.images.push({ 'url': '/Content/Imagens/samurai1.gif', 'id': 'samurai1' });
        $scope.images.push({ 'url': '/Content/Imagens/samurai2.gif', 'id': 'samurai2' });
        $scope.images.push({ 'url': '/Content/Imagens/snkzombie.gif', 'id': 'snkzombie' });
        $scope.images.push({ 'url': '/Content/Imagens/ViviStaffShake.gif', 'id': 'ViviStaffShake' });
        $scope.images.push({ 'url': '/Content/Imagens/warrior.gif', 'id': 'warrior' });
        $scope.images.push({ 'url': '/Content/Imagens/zombie.gif', 'id': 'zombie' });
        $scope.images.push({ 'url': '/Content/Imagens/Zombiesoldier.gif', 'id': 'Zombiesoldier' });
    }

    $scope.usuario = 'Acessar';
    $scope.users = [];
    $scope.classentry = 'mostrar';
    $scope.classentrychat = 'ocultar';
    $scope.messages = [];
    $scope.cor = 'red';
    $scope.images = [];
    $scope.incrementod6 = 0;
    $scope.incrementod8 = 0;
    $scope.incrementod10 = 0;
    $scope.incrementod12 = 0;
    $scope.incrementod20 = 0;


    $('#dicepanel,#boxusuarios,#boxchat,#pos').draggable();   
    
}]);


mainApp.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if (event.which === 13) {
                scope.$apply(function () {
                    scope.$eval(attrs.ngEnter);
                });

                event.preventDefault();
            }
        });
    };
});