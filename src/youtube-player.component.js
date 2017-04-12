"use strict";
var core_1 = require('@angular/core');
var youtube_player_service_1 = require('./youtube-player.service');
var YoutubePlayer = (function () {
    function YoutubePlayer(playerService, elementRef) {
        this.playerService = playerService;
        this.elementRef = elementRef;
        this.videoId = '';
        // player created and initialized - sends instance of the player
        this.ready = new core_1.EventEmitter();
        // state change: send the YT event with its state
        this.change = new core_1.EventEmitter();
    }
    YoutubePlayer.prototype.ngAfterContentInit = function () {
        var htmlId = this.playerService.generateUniqueId();
        var playerSize = { height: this.height, width: this.width };
        this.ytPlayerContainer.nativeElement.setAttribute('id', htmlId);
        this.playerService.loadPlayerApi();
        this.playerService.setupPlayer(htmlId, {
            ready: this.ready,
            change: this.change
        }, playerSize, this.videoId, this.playerVars);
    };
    YoutubePlayer.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'youtube-player',
                    template: "\n\t\t<div id=\"yt-player-ng2-component\" #ytPlayerContainer></div>\n\t",
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush
                },] },
    ];
    /** @nocollapse */
    YoutubePlayer.ctorParameters = function () { return [
        { type: youtube_player_service_1.YoutubePlayerService, },
        { type: core_1.ElementRef, },
    ]; };
    YoutubePlayer.propDecorators = {
        'videoId': [{ type: core_1.Input },],
        'height': [{ type: core_1.Input },],
        'width': [{ type: core_1.Input },],
        'playerVars': [{ type: core_1.Input },],
        'ready': [{ type: core_1.Output },],
        'change': [{ type: core_1.Output },],
        'ytPlayerContainer': [{ type: core_1.ViewChild, args: ['ytPlayerContainer',] },],
    };
    return YoutubePlayer;
}());
exports.YoutubePlayer = YoutubePlayer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieW91dHViZS1wbGF5ZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsieW91dHViZS1wbGF5ZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxxQkFBeUgsZUFBZSxDQUFDLENBQUE7QUFFekksdUNBQXFDLDBCQUEwQixDQUFDLENBQUE7QUFHaEU7SUFhQyx1QkFDUSxhQUFtQyxFQUNsQyxVQUFzQjtRQUR2QixrQkFBYSxHQUFiLGFBQWEsQ0FBc0I7UUFDbEMsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQWQ5QixZQUFPLEdBQVcsRUFBRSxDQUFDO1FBS3RCLGdFQUFnRTtRQUMvRCxVQUFLLEdBQUcsSUFBSSxtQkFBWSxFQUFhLENBQUM7UUFDdkMsaURBQWlEO1FBQ2hELFdBQU0sR0FBRyxJQUFJLG1CQUFZLEVBQUUsQ0FBQztJQVE3QixDQUFDO0lBRUQsMENBQWtCLEdBQWxCO1FBQ0MsSUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQ3JELElBQU0sVUFBVSxHQUFHLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUM5RCxJQUFJLENBQUMsaUJBQWlCLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDaEUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUNuQyxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUU7WUFDdEMsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO1lBQ2pCLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtTQUNuQixFQUFFLFVBQVUsRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBQ0ssd0JBQVUsR0FBMEI7UUFDM0MsRUFBRSxJQUFJLEVBQUUsZ0JBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQztvQkFDekIsUUFBUSxFQUFFLGdCQUFnQjtvQkFDMUIsUUFBUSxFQUFFLHlFQUVUO29CQUNELGVBQWUsRUFBRSw4QkFBdUIsQ0FBQyxNQUFNO2lCQUMvQyxFQUFHLEVBQUU7S0FDTCxDQUFDO0lBQ0Ysa0JBQWtCO0lBQ1gsNEJBQWMsR0FBbUUsY0FBTSxPQUFBO1FBQzlGLEVBQUMsSUFBSSxFQUFFLDZDQUFvQixHQUFHO1FBQzlCLEVBQUMsSUFBSSxFQUFFLGlCQUFVLEdBQUc7S0FDbkIsRUFINkYsQ0FHN0YsQ0FBQztJQUNLLDRCQUFjLEdBQTJDO1FBQ2hFLFNBQVMsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFlBQUssRUFBRSxFQUFFO1FBQzdCLFFBQVEsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFlBQUssRUFBRSxFQUFFO1FBQzVCLE9BQU8sRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFlBQUssRUFBRSxFQUFFO1FBQzNCLFlBQVksRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFlBQUssRUFBRSxFQUFFO1FBQ2hDLE9BQU8sRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLGFBQU0sRUFBRSxFQUFFO1FBQzVCLFFBQVEsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLGFBQU0sRUFBRSxFQUFFO1FBQzdCLG1CQUFtQixFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsZ0JBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxtQkFBbUIsRUFBRyxFQUFFLEVBQUU7S0FDekUsQ0FBQztJQUNGLG9CQUFDO0FBQUQsQ0FBQyxBQXBERCxJQW9EQztBQXBEWSxxQkFBYSxnQkFvRHpCLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIEFmdGVyQ29udGVudEluaXQsIEVsZW1lbnRSZWYsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBZb3V0dWJlUGxheWVyU2VydmljZSB9IGZyb20gJy4veW91dHViZS1wbGF5ZXIuc2VydmljZSc7XG5cblxuZXhwb3J0IGNsYXNzIFlvdXR1YmVQbGF5ZXIgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0IHtcblx0IHZpZGVvSWQ6IHN0cmluZyA9ICcnO1xuXHQgaGVpZ2h0OiBudW1iZXI7XG5cdCB3aWR0aDogbnVtYmVyO1xuXHQgcGxheWVyVmFyczogWVQuUGxheWVyVmFycztcblxuXHQvLyBwbGF5ZXIgY3JlYXRlZCBhbmQgaW5pdGlhbGl6ZWQgLSBzZW5kcyBpbnN0YW5jZSBvZiB0aGUgcGxheWVyXG5cdCByZWFkeSA9IG5ldyBFdmVudEVtaXR0ZXI8WVQuUGxheWVyPigpO1xuXHQvLyBzdGF0ZSBjaGFuZ2U6IHNlbmQgdGhlIFlUIGV2ZW50IHdpdGggaXRzIHN0YXRlXG5cdCBjaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cblx0IHByaXZhdGUgeXRQbGF5ZXJDb250YWluZXI6IEVsZW1lbnRSZWY7XG5cblx0Y29uc3RydWN0b3IoXG5cdFx0cHVibGljIHBsYXllclNlcnZpY2U6IFlvdXR1YmVQbGF5ZXJTZXJ2aWNlLFxuXHRcdHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZlxuXHQpIHtcblx0fVxuXG5cdG5nQWZ0ZXJDb250ZW50SW5pdCAoKSB7XG5cdFx0Y29uc3QgaHRtbElkID0gdGhpcy5wbGF5ZXJTZXJ2aWNlLmdlbmVyYXRlVW5pcXVlSWQoKTtcblx0XHRjb25zdCBwbGF5ZXJTaXplID0geyBoZWlnaHQ6IHRoaXMuaGVpZ2h0LCB3aWR0aDogdGhpcy53aWR0aCB9O1xuXHRcdHRoaXMueXRQbGF5ZXJDb250YWluZXIubmF0aXZlRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2lkJywgaHRtbElkKTtcblx0XHR0aGlzLnBsYXllclNlcnZpY2UubG9hZFBsYXllckFwaSgpO1xuXHRcdHRoaXMucGxheWVyU2VydmljZS5zZXR1cFBsYXllcihodG1sSWQsIHtcblx0XHRcdHJlYWR5OiB0aGlzLnJlYWR5LFxuXHRcdFx0Y2hhbmdlOiB0aGlzLmNoYW5nZVxuXHRcdH0sIHBsYXllclNpemUsIHRoaXMudmlkZW9JZCwgdGhpcy5wbGF5ZXJWYXJzKTtcblx0fVxuc3RhdGljIGRlY29yYXRvcnM6IERlY29yYXRvckludm9jYXRpb25bXSA9IFtcbnsgdHlwZTogQ29tcG9uZW50LCBhcmdzOiBbe1xuXHRzZWxlY3RvcjogJ3lvdXR1YmUtcGxheWVyJyxcblx0dGVtcGxhdGU6IGBcblx0XHQ8ZGl2IGlkPVwieXQtcGxheWVyLW5nMi1jb21wb25lbnRcIiAjeXRQbGF5ZXJDb250YWluZXI+PC9kaXY+XG5cdGAsXG5cdGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59LCBdIH0sXG5dO1xuLyoqIEBub2NvbGxhcHNlICovXG5zdGF0aWMgY3RvclBhcmFtZXRlcnM6ICgpID0+ICh7dHlwZTogYW55LCBkZWNvcmF0b3JzPzogRGVjb3JhdG9ySW52b2NhdGlvbltdfXxudWxsKVtdID0gKCkgPT4gW1xue3R5cGU6IFlvdXR1YmVQbGF5ZXJTZXJ2aWNlLCB9LFxue3R5cGU6IEVsZW1lbnRSZWYsIH0sXG5dO1xuc3RhdGljIHByb3BEZWNvcmF0b3JzOiB7W2tleTogc3RyaW5nXTogRGVjb3JhdG9ySW52b2NhdGlvbltdfSA9IHtcbid2aWRlb0lkJzogW3sgdHlwZTogSW5wdXQgfSxdLFxuJ2hlaWdodCc6IFt7IHR5cGU6IElucHV0IH0sXSxcbid3aWR0aCc6IFt7IHR5cGU6IElucHV0IH0sXSxcbidwbGF5ZXJWYXJzJzogW3sgdHlwZTogSW5wdXQgfSxdLFxuJ3JlYWR5JzogW3sgdHlwZTogT3V0cHV0IH0sXSxcbidjaGFuZ2UnOiBbeyB0eXBlOiBPdXRwdXQgfSxdLFxuJ3l0UGxheWVyQ29udGFpbmVyJzogW3sgdHlwZTogVmlld0NoaWxkLCBhcmdzOiBbJ3l0UGxheWVyQ29udGFpbmVyJywgXSB9LF0sXG59O1xufVxuXG5pbnRlcmZhY2UgRGVjb3JhdG9ySW52b2NhdGlvbiB7XG4gIHR5cGU6IEZ1bmN0aW9uO1xuICBhcmdzPzogYW55W107XG59XG4iXX0=