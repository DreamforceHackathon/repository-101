//
//  Copyright 2013 Twilio. All rights reserved.
//
 
#import <Foundation/Foundation.h>

#import "TwilioClient.h"
#import "ConferencePhoneReachability.h"

@interface ConferencePhone : NSObject<TCConnectionDelegate, TCDeviceDelegate, UIAlertViewDelegate>
{
@private
	TCDevice* _device;
	TCConnection* _connection;
	NSString* _conferenceName;
    ConferencePhoneReachability *_internetReachability;
    BOOL _loggedIn;
    BOOL _backgroundSupported;
    UIBackgroundTaskIdentifier _backgroundTaskAgent;
}
@property (nonatomic,retain) TCDevice* device;
@property (nonatomic,retain) TCConnection* connection;
@property (nonatomic,retain) ConferencePhoneReachability *internetReachability;
@property (assign) UIBackgroundTaskIdentifier backgroundTaskAgent;


// Log-in to the Twilio Account and Application, creating and initializing
// the TCDevice.
-(void)login;
-(void)loginHelper;

// Connect to a named conference.
-(void)connect:(NSString*)conferenceName;
// Disconnect from the named conference.
-(void)disconnect;

// Make outbound calls via the Twilio API to invite the participants to join the conference.
-(void)performCalls:(NSArray*)participants;

@end
