//
//  Copyright 2013 Twilio. All rights reserved.
//
 
#import "WalkieTalkieNotifications.h"

NSString* const WTLoginDidStart									= @"WTLoginDidStart";
NSString* const WTLoginDidFinish								= @"WTLoginDidFinish";
NSString* const WTLoginDidFailWithError							= @"WTLoginDidFailWithError";

NSString* const WTPendingIncomingConnectionReceived			= @"WTPendingIncomingConnectionReceived";
NSString* const WTPendingIncomingConnectionDidDisconnect	= @"WTPendingIncomingConnectionDidDisconnect";
NSString* const WTPendingConnectionDidDisconnect			= @"WTConnectionDidDisconnect";
NSString* const WTConnectionDidConnect						= @"WTConnectionDidConnect";
NSString* const WTConnectionDidDisconnect					= @"WTConnectionDidDisconnect";
NSString* const WTConnectionDidFailWithError				= @"WTConnectionDidFailWithError";