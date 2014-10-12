//
//  User.h
//  CallForce
//
//  Created by henrythe9th on 10/12/14.
//  Copyright (c) 2014 CallForce. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface User : NSObject
+ (User *)sharedInstance;
@property (nonatomic) BOOL showedLogin;
@end