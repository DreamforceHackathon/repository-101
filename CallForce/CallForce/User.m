//
//  User.m
//  CallForce
//
//  Created by henrythe9th on 10/12/14.
//  Copyright (c) 2014 CallForce. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "User.h"


@implementation User

+ (User *)sharedInstance
{
    static User *_sharedInstance;
    if (_sharedInstance == nil) {
        _sharedInstance = [[User alloc] init];
    }
    return _sharedInstance;
}

@end