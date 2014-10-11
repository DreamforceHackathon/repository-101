//
//  Copyright 2013 Twilio. All rights reserved.
//
 
#import <Foundation/Foundation.h>
#import "TCDevice.h"
#import "TCConnection.h"
#import "TCConnectionDelegate.h"
#import "WalkieTalkieReachability.h"

@interface WalkieTalkie : NSObject<TCDeviceDelegate, TCConnectionDelegate> 
{
@private
	TCDevice* _device;
	TCConnection* _connection;
	TCConnection* _pendingIncomingConnection;
    WalkieTalkieReachability *_internetReachability;
    BOOL _loggedIn;
    BOOL _backgroundSupported;
    UIBackgroundTaskIdentifier _backgroundTaskAgent;
}

@property (nonatomic,retain)	TCConnection* connection;
@property (nonatomic,retain)	TCConnection* pendingIncomingConnection;
@property (nonatomic)			BOOL muted;
@property (nonatomic,retain) WalkieTalkieReachability *internetReachability;
@property (assign) UIBackgroundTaskIdentifier backgroundTaskAgent;


//TCConnection related Methods
-(void)connect:(NSString*)clientName;
-(void)disconnect;
-(void)acceptIncomingConnection;
-(void)ignoreIncomingConnection;
-(void)login;
-(void)loginHelper;


@end
