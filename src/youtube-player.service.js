"use strict";
var core_1 = require('@angular/core');
var ReplaySubject_1 = require('rxjs/ReplaySubject');
var YoutubePlayerService = (function () {
    function YoutubePlayerService(zone) {
        this.zone = zone;
        this.isFullscreen = false;
        this.defaultSizes = {
            height: 270,
            width: 367
        };
        this.createApi();
    }
    Object.defineProperty(YoutubePlayerService, "win", {
        get: function () {
            return window;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(YoutubePlayerService, "YT", {
        get: function () {
            return YoutubePlayerService.win['YT'];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(YoutubePlayerService, "Player", {
        get: function () {
            return YoutubePlayerService.YT.Player;
        },
        enumerable: true,
        configurable: true
    });
    YoutubePlayerService.prototype.createApi = function () {
        var _this = this;
        this.api = new ReplaySubject_1.ReplaySubject(1);
        var onYouTubeIframeAPIReady = function () { YoutubePlayerService.win && _this.api.next(YoutubePlayerService.YT); };
        YoutubePlayerService.win['onYouTubeIframeAPIReady'] = onYouTubeIframeAPIReady;
    };
    YoutubePlayerService.prototype.loadPlayerApi = function () {
        var doc = YoutubePlayerService.win.document;
        var playerApiScript = doc.createElement("script");
        playerApiScript.type = "text/javascript";
        playerApiScript.src = "http://www.youtube.com/iframe_api";
        doc.body.appendChild(playerApiScript);
    };
    YoutubePlayerService.prototype.setupPlayer = function (elementId, outputs, sizes, videoId, playerVars) {
        var _this = this;
        var createPlayer = function () {
            if (YoutubePlayerService.Player) {
                _this.createPlayer(elementId, outputs, sizes, videoId, playerVars);
            }
        };
        this.api.subscribe(createPlayer);
    };
    YoutubePlayerService.prototype.play = function (player) {
        player.playVideo();
    };
    YoutubePlayerService.prototype.pause = function (player) {
        player.pauseVideo();
    };
    YoutubePlayerService.prototype.playVideo = function (media, player) {
        var id = media.id.videoId ? media.id.videoId : media.id;
        player.loadVideoById(id);
        this.play(player);
    };
    YoutubePlayerService.prototype.isPlaying = function (player) {
        // because YT is not loaded yet 1 is used - YT.PlayerState.PLAYING
        var isPlayerReady = player && player.getPlayerState;
        var playerState = isPlayerReady ? player.getPlayerState() : {};
        var isPlayerPlaying = isPlayerReady
            ? playerState !== YT.PlayerState.ENDED && playerState !== YT.PlayerState.PAUSED
            : false;
        return isPlayerPlaying;
    };
    YoutubePlayerService.prototype.createPlayer = function (elementId, outputs, sizes, videoId, playerVars) {
        var _this = this;
        var service = this;
        var playerSize = {
            height: sizes.height || this.defaultSizes.height,
            width: sizes.width || this.defaultSizes.width
        };
        return new YoutubePlayerService.Player(elementId, Object.assign({}, playerSize, {
            videoId: videoId || '',
            playerVars: playerVars,
            events: {
                onReady: function (ev) {
                    _this.zone.run(function () { return outputs.ready && outputs.ready.next(ev.target); });
                },
                onStateChange: function (ev) {
                    _this.zone.run(function () { return outputs.change && outputs.change.next(ev); });
                    // this.zone.run(() => onPlayerStateChange(ev));
                }
            }
        }));
        // TODO: DEPRECATE?
        function onPlayerStateChange(event) {
            var state = event.data;
            var PlayerState = YoutubePlayerService.YT.PlayerState;
            // play the next song if its not the end of the playlist
            // should add a "repeat" feature
            if (state === PlayerState.ENDED) {
            }
            if (state === PlayerState.PAUSED) {
            }
            if (state === PlayerState.PLAYING) {
            }
        }
    };
    YoutubePlayerService.prototype.toggleFullScreen = function (player, isFullScreen) {
        var _a = this.defaultSizes, height = _a.height, width = _a.width;
        if (!isFullScreen) {
            height = window.innerHeight;
            width = window.innerWidth;
        }
        player.setSize(width, height);
        // TODO: dispatch event
    };
    // adpoted from uid
    YoutubePlayerService.prototype.generateUniqueId = function () {
        var len = 7;
        return Math.random().toString(35).substr(2, len);
    };
    YoutubePlayerService.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    YoutubePlayerService.ctorParameters = function () { return [
        { type: core_1.NgZone, },
    ]; };
    return YoutubePlayerService;
}());
exports.YoutubePlayerService = YoutubePlayerService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieW91dHViZS1wbGF5ZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInlvdXR1YmUtcGxheWVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLHFCQUFpRCxlQUFlLENBQUMsQ0FBQTtBQUNqRSw4QkFBOEIsb0JBRTlCLENBQUMsQ0FGaUQ7QUFhbEQ7SUFxQkUsOEJBQXFCLElBQVk7UUFBWixTQUFJLEdBQUosSUFBSSxDQUFRO1FBTnpCLGlCQUFZLEdBQVksS0FBSyxDQUFDO1FBQzlCLGlCQUFZLEdBQUc7WUFDbkIsTUFBTSxFQUFFLEdBQUc7WUFDWCxLQUFLLEVBQUUsR0FBRztTQUNiLENBQUM7UUFHQSxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDbkIsQ0FBQztJQXRCRCxzQkFBVywyQkFBRzthQUFkO1lBQ0UsTUFBTSxDQUFDLE1BQU0sQ0FBQztRQUNoQixDQUFDOzs7T0FBQTtJQUVELHNCQUFXLDBCQUFFO2FBQWI7WUFDRSxNQUFNLENBQUMsb0JBQW9CLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3hDLENBQUM7OztPQUFBO0lBRUQsc0JBQVcsOEJBQU07YUFBakI7WUFDRSxNQUFNLENBQUMsb0JBQW9CLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQztRQUN4QyxDQUFDOzs7T0FBQTtJQWNPLHdDQUFTLEdBQWpCO1FBQUEsaUJBSUM7UUFIQyxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksNkJBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNoQyxJQUFNLHVCQUF1QixHQUFHLGNBQVEsb0JBQW9CLENBQUMsR0FBRyxJQUFJLEtBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFNLG9CQUFvQixDQUFDLEVBQUUsQ0FBQyxDQUFBLENBQUMsQ0FBQyxDQUFBO1FBQ2pILG9CQUFvQixDQUFDLEdBQUcsQ0FBQyx5QkFBeUIsQ0FBQyxHQUFHLHVCQUF1QixDQUFDO0lBQ2hGLENBQUM7SUFFRCw0Q0FB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LEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztRQUM5Qix1QkFBdUI7SUFDekIsQ0FBQztJQUVELG1CQUFtQjtJQUNuQiwrQ0FBZ0IsR0FBaEI7UUFDRSxJQUFNLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDZCxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ25ELENBQUM7SUFDSSwrQkFBVSxHQUEwQjtRQUMzQyxFQUFFLElBQUksRUFBRSxpQkFBVSxFQUFFO0tBQ25CLENBQUM7SUFDRixrQkFBa0I7SUFDWCxtQ0FBYyxHQUFtRSxjQUFNLE9BQUE7UUFDOUYsRUFBQyxJQUFJLEVBQUUsYUFBTSxHQUFHO0tBQ2YsRUFGNkYsQ0FFN0YsQ0FBQztJQUNGLDJCQUFDO0FBQUQsQ0FBQyxBQXRJRCxJQXNJQztBQXRJWSw0QkFBb0IsdUJBc0loQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSHR0cCwgVVJMU2VhcmNoUGFyYW1zLCBSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2h0dHAnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSwgTmdab25lLCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJlcGxheVN1YmplY3QgfSBmcm9tICdyeGpzL1JlcGxheVN1YmplY3QnXG5cbmV4cG9ydCBpbnRlcmZhY2UgUGxheWVyT3V0cHV0cyB7XG4gIHJlYWR5PzogRXZlbnRFbWl0dGVyPFlULlBsYXllcj47XG4gIGNoYW5nZT86IEV2ZW50RW1pdHRlcjxZVC5FdmVudEFyZ3M+O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFBsYXllclNpemUge1xuICBoZWlnaHQ/OiBudW1iZXI7XG4gIHdpZHRoPzogbnVtYmVyO1xufVxuXG5cbmV4cG9ydCBjbGFzcyBZb3V0dWJlUGxheWVyU2VydmljZSB7XG4gIHN0YXRpYyBnZXQgd2luICgpIHtcbiAgICByZXR1cm4gd2luZG93O1xuICB9XG5cbiAgc3RhdGljIGdldCBZVCgpIHtcbiAgICByZXR1cm4gWW91dHViZVBsYXllclNlcnZpY2Uud2luWydZVCddO1xuICB9XG5cbiAgc3RhdGljIGdldCBQbGF5ZXIoKSB7XG4gICAgcmV0dXJuIFlvdXR1YmVQbGF5ZXJTZXJ2aWNlLllULlBsYXllcjtcbiAgfVxuXG4gIGFwaTogUmVwbGF5U3ViamVjdDxZVC5QbGF5ZXI+O1xuXG4gIHByaXZhdGUgaXNGdWxsc2NyZWVuOiBib29sZWFuID0gZmFsc2U7XG4gIHByaXZhdGUgZGVmYXVsdFNpemVzID0ge1xuICAgICAgaGVpZ2h0OiAyNzAsXG4gICAgICB3aWR0aDogMzY3XG4gIH07XG5cbiAgY29uc3RydWN0b3IgKHByaXZhdGUgem9uZTogTmdab25lKSB7XG4gICAgdGhpcy5jcmVhdGVBcGkoKTtcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlQXBpICgpIHtcbiAgICB0aGlzLmFwaSA9IG5ldyBSZXBsYXlTdWJqZWN0KDEpO1xuICAgIGNvbnN0IG9uWW91VHViZUlmcmFtZUFQSVJlYWR5ID0gKCkgPT4geyBZb3V0dWJlUGxheWVyU2VydmljZS53aW4gJiYgdGhpcy5hcGkubmV4dCg8YW55PllvdXR1YmVQbGF5ZXJTZXJ2aWNlLllUKSB9XG4gICAgWW91dHViZVBsYXllclNlcnZpY2Uud2luWydvbllvdVR1YmVJZnJhbWVBUElSZWFkeSddID0gb25Zb3VUdWJlSWZyYW1lQVBJUmVhZHk7XG4gIH1cblxuICBsb2FkUGxheWVyQXBpICgpIHtcbiAgICBjb25zdCBkb2MgPSBZb3V0dWJlUGxheWVyU2VydmljZS53aW4uZG9jdW1lbnQ7XG4gICAgbGV0IHBsYXllckFwaVNjcmlwdCA9IGRvYy5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO1xuICAgIHBsYXllckFwaVNjcmlwdC50eXBlID0gXCJ0ZXh0L2phdmFzY3JpcHRcIjtcbiAgICBwbGF5ZXJBcGlTY3JpcHQuc3JjID0gXCJodHRwOi8vd3d3LnlvdXR1YmUuY29tL2lmcmFtZV9hcGlcIjtcbiAgICBkb2MuYm9keS5hcHBlbmRDaGlsZChwbGF5ZXJBcGlTY3JpcHQpO1xuICB9XG5cbiAgc2V0dXBQbGF5ZXIgKGVsZW1lbnRJZDogc3RyaW5nLCBvdXRwdXRzOiBQbGF5ZXJPdXRwdXRzLCBzaXplczogUGxheWVyU2l6ZSwgdmlkZW9JZDogc3RyaW5nLCBwbGF5ZXJWYXJzOllULlBsYXllclZhcnMpIHtcbiAgICBjb25zdCBjcmVhdGVQbGF5ZXIgPSAoKSA9PiB7XG4gICAgICBpZiAoWW91dHViZVBsYXllclNlcnZpY2UuUGxheWVyKSB7XG4gICAgICAgIHRoaXMuY3JlYXRlUGxheWVyKGVsZW1lbnRJZCwgb3V0cHV0cywgc2l6ZXMsIHZpZGVvSWQsIHBsYXllclZhcnMpO1xuICAgICAgfVxuICAgIH07XG4gICAgdGhpcy5hcGkuc3Vic2NyaWJlKGNyZWF0ZVBsYXllcik7XG4gIH1cblxuICBwbGF5IChwbGF5ZXI6IFlULlBsYXllcikge1xuICAgIHBsYXllci5wbGF5VmlkZW8oKTtcbiAgfVxuXG4gIHBhdXNlIChwbGF5ZXI6IFlULlBsYXllcikge1xuICAgIHBsYXllci5wYXVzZVZpZGVvKCk7XG4gIH1cblxuICBwbGF5VmlkZW8obWVkaWE6IGFueSwgcGxheWVyOiBZVC5QbGF5ZXIpIHtcbiAgICBjb25zdCBpZCA9IG1lZGlhLmlkLnZpZGVvSWQgPyBtZWRpYS5pZC52aWRlb0lkIDogbWVkaWEuaWQ7XG4gICAgcGxheWVyLmxvYWRWaWRlb0J5SWQoaWQpO1xuICAgIHRoaXMucGxheShwbGF5ZXIpO1xuICB9XG5cbiAgaXNQbGF5aW5nIChwbGF5ZXI6IFlULlBsYXllcikge1xuICAgIC8vIGJlY2F1c2UgWVQgaXMgbm90IGxvYWRlZCB5ZXQgMSBpcyB1c2VkIC0gWVQuUGxheWVyU3RhdGUuUExBWUlOR1xuICAgIGNvbnN0IGlzUGxheWVyUmVhZHk6IGFueSA9IHBsYXllciAmJiBwbGF5ZXIuZ2V0UGxheWVyU3RhdGU7XG4gICAgY29uc3QgcGxheWVyU3RhdGUgPSBpc1BsYXllclJlYWR5ID8gcGxheWVyLmdldFBsYXllclN0YXRlKCkgOiB7fTtcbiAgICBjb25zdCBpc1BsYXllclBsYXlpbmcgPSBpc1BsYXllclJlYWR5XG4gICAgICA/IHBsYXllclN0YXRlICE9PSBZVC5QbGF5ZXJTdGF0ZS5FTkRFRCAmJiBwbGF5ZXJTdGF0ZSAhPT0gWVQuUGxheWVyU3RhdGUuUEFVU0VEXG4gICAgICA6IGZhbHNlO1xuICAgIHJldHVybiBpc1BsYXllclBsYXlpbmc7XG4gIH1cblxuICBjcmVhdGVQbGF5ZXIgKGVsZW1lbnRJZDogc3RyaW5nLCBvdXRwdXRzOiBQbGF5ZXJPdXRwdXRzLCBzaXplczogUGxheWVyU2l6ZSwgdmlkZW9JZDogc3RyaW5nLCBwbGF5ZXJWYXJzOiBZVC5QbGF5ZXJWYXJzKSB7XG4gICAgY29uc3Qgc2VydmljZSA9IHRoaXM7XG4gICAgY29uc3QgcGxheWVyU2l6ZSA9IHtcbiAgICAgIGhlaWdodDogc2l6ZXMuaGVpZ2h0IHx8IHRoaXMuZGVmYXVsdFNpemVzLmhlaWdodCxcbiAgICAgIHdpZHRoOiBzaXplcy53aWR0aCB8fCB0aGlzLmRlZmF1bHRTaXplcy53aWR0aFxuICAgIH07XG4gICAgcmV0dXJuIG5ldyBZb3V0dWJlUGxheWVyU2VydmljZS5QbGF5ZXIoZWxlbWVudElkLCBPYmplY3QuYXNzaWduKHt9LCBwbGF5ZXJTaXplLCB7XG4gICAgICB2aWRlb0lkOiB2aWRlb0lkIHx8ICcnLFxuICAgICAgcGxheWVyVmFyczogcGxheWVyVmFycyxcbiAgICAgIGV2ZW50czoge1xuICAgICAgICAgIG9uUmVhZHk6IChldjogWVQuRXZlbnRBcmdzKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IG91dHB1dHMucmVhZHkgJiYgb3V0cHV0cy5yZWFkeS5uZXh0KGV2LnRhcmdldCkpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgb25TdGF0ZUNoYW5nZTogKGV2OiBZVC5FdmVudEFyZ3MpID0+IHtcbiAgICAgICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4gb3V0cHV0cy5jaGFuZ2UgJiYgb3V0cHV0cy5jaGFuZ2UubmV4dChldikpO1xuICAgICAgICAgICAgLy8gdGhpcy56b25lLnJ1bigoKSA9PiBvblBsYXllclN0YXRlQ2hhbmdlKGV2KSk7XG4gICAgICAgICAgfVxuICAgICAgfVxuICAgIH0pKTtcblxuICAgIC8vIFRPRE86IERFUFJFQ0FURT9cbiAgICBmdW5jdGlvbiBvblBsYXllclN0YXRlQ2hhbmdlIChldmVudDogYW55KSB7XG4gICAgICBjb25zdCBzdGF0ZSA9IGV2ZW50LmRhdGE7XG4gICAgICBjb25zdCBQbGF5ZXJTdGF0ZSA9IFlvdXR1YmVQbGF5ZXJTZXJ2aWNlLllULlBsYXllclN0YXRlO1xuICAgICAgLy8gcGxheSB0aGUgbmV4dCBzb25nIGlmIGl0cyBub3QgdGhlIGVuZCBvZiB0aGUgcGxheWxpc3RcbiAgICAgIC8vIHNob3VsZCBhZGQgYSBcInJlcGVhdFwiIGZlYXR1cmVcbiAgICAgIGlmIChzdGF0ZSA9PT0gUGxheWVyU3RhdGUuRU5ERUQpIHtcblxuICAgICAgfVxuXG4gICAgICBpZiAoc3RhdGUgPT09IFBsYXllclN0YXRlLlBBVVNFRCkge1xuICAgICAgICAgIC8vIHNlcnZpY2UucGxheWVyU3RhdGUgPSBQbGF5ZXJTdGF0ZS5QQVVTRUQ7XG4gICAgICB9XG4gICAgICBpZiAoc3RhdGUgPT09IFBsYXllclN0YXRlLlBMQVlJTkcpIHtcbiAgICAgICAgICAvLyBzZXJ2aWNlLnBsYXllclN0YXRlID0gUGxheWVyU3RhdGUuUExBWUlORztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB0b2dnbGVGdWxsU2NyZWVuIChwbGF5ZXI6IFlULlBsYXllciwgaXNGdWxsU2NyZWVuOiBib29sZWFuIHwgbnVsbCB8IHVuZGVmaW5lZCkge1xuICAgIGxldCB7IGhlaWdodCwgd2lkdGggfSA9IHRoaXMuZGVmYXVsdFNpemVzO1xuXG4gICAgaWYgKCFpc0Z1bGxTY3JlZW4pIHtcbiAgICAgIGhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcbiAgICAgIHdpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgfVxuICAgIHBsYXllci5zZXRTaXplKHdpZHRoLCBoZWlnaHQpO1xuICAgIC8vIFRPRE86IGRpc3BhdGNoIGV2ZW50XG4gIH1cblxuICAvLyBhZHBvdGVkIGZyb20gdWlkXG4gIGdlbmVyYXRlVW5pcXVlSWQgKCkge1xuICAgIGNvbnN0IGxlbiA9IDc7XG4gICAgcmV0dXJuIE1hdGgucmFuZG9tKCkudG9TdHJpbmcoMzUpLnN1YnN0cigyLCBsZW4pO1xuICB9XG5zdGF0aWMgZGVjb3JhdG9yczogRGVjb3JhdG9ySW52b2NhdGlvbltdID0gW1xueyB0eXBlOiBJbmplY3RhYmxlIH0sXG5dO1xuLyoqIEBub2NvbGxhcHNlICovXG5zdGF0aWMgY3RvclBhcmFtZXRlcnM6ICgpID0+ICh7dHlwZTogYW55LCBkZWNvcmF0b3JzPzogRGVjb3JhdG9ySW52b2NhdGlvbltdfXxudWxsKVtdID0gKCkgPT4gW1xue3R5cGU6IE5nWm9uZSwgfSxcbl07XG59XG5cbmludGVyZmFjZSBEZWNvcmF0b3JJbnZvY2F0aW9uIHtcbiAgdHlwZTogRnVuY3Rpb247XG4gIGFyZ3M/OiBhbnlbXTtcbn1cbiJdfQ==