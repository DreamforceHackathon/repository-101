//
//  Copyright 2013 Twilio. All rights reserved.
//
 
#import <Foundation/Foundation.h>
#import "TwilioClient.h"
#import "BasicPhoneReachability.h"

@interface BasicPhone : NSObject<TCDeviceDelegate, TCConnectionDelegate, UIAlertViewDelegate> 
{
@private
	TCDevice* _device;
	TCConnection* _connection;
	TCConnection* _pendingIncomingConnection;
	BOOL _speakerEnabled;
    BasicPhoneReachability *_internetReachability;
    BOOL _loggedIn;
    BOOL _backgroundSupported;
    UIBackgroundTaskIdentifier _backgroundTaskAgent;
}

@property (nonatomic,retain) TCDevice* device;
@property (nonatomic,retain) TCConnection* connection;
@property (nonatomic,retain) TCConnection* pendingIncomingConnection;
@property (nonatomic,retain) BasicPhoneReachability *internetReachability;
@property (assign) UIBackgroundTaskIdentifier backgroundTaskAgent;

-(void)login;
-(void)loginHelper;

// Turn the speaker on or off.
-(void)setSpeakerEnabled:(BOOL)enabled;

//TCConnection Methods
-(void)connect;
-(void)disconnect;
-(void)acceptConnection;
-(void)ignoreIncomingConnection;

@end
