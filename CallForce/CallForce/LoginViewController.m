//
//  LoginViewController.m
//  CallForce
//
//  Created by henrythe9th on 10/11/14.
//  Copyright (c) 2014 CallForce. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "LoginViewController.h"
#import "CallForce-Swift.h"
#import "AFHTTPRequestOperation.h"
#import "LIALinkedInHttpClient.h"
#import "LIALinkedInApplication.h"

@interface LoginViewController ()
@property (weak, nonatomic) IBOutlet GradientView *gradientView;
- (IBAction)loginButtonTapped:(id)sender;

@end

@implementation LoginViewController

LIALinkedInHttpClient *_client;

- (void)viewDidLoad {
    [super viewDidLoad];
//  UIColor *purpleColor = [UIColor colorWithRed:122/255 green:103/255 blue:175/255 alpha:0.6];
//  UIColor *blueColor =  [UIColor colorWithRed:84/255 green:0.502 blue:0.667 alpha:0.6];
//  NSArray *colors = @[purpleColor, blueColor];
//  [self.gradientView drawGradient:colors];
    _client = [self client];
}

- (IBAction)loginButtonTapped:(id)sender {
    [self.client getAuthorizationCode:^(NSString *code) {
        [self.client getAccessToken:code success:^(NSDictionary *accessTokenData) {
            NSString *accessToken = [accessTokenData objectForKey:@"access_token"];
            [self requestMeWithToken:accessToken];
        }                   failure:^(NSError *error) {
            NSLog(@"Quering accessToken failed %@", error);
        }];
    }                      cancel:^{
        NSLog(@"Authorization was cancelled by user");
    }                     failure:^(NSError *error) {
        NSLog(@"Authorization failed %@", error);
    }];
  
  [[self presentedViewController] dismissViewControllerAnimated:false completion:nil];

}


- (void)requestMeWithToken:(NSString *)accessToken {
    [self.client GET:[NSString stringWithFormat:@"https://api.linkedin.com/v1/people/~?oauth2_access_token=%@&format=json", accessToken] parameters:nil success:^(AFHTTPRequestOperation *operation, NSDictionary *result) {
        NSLog(@"current user %@", result);
    }        failure:^(AFHTTPRequestOperation *operation, NSError *error) {
        NSLog(@"failed to fetch current user %@", error);
    }];
}

- (LIALinkedInHttpClient *)client {
    LIALinkedInApplication *application = [LIALinkedInApplication applicationWithRedirectURL:@"http://www.google.com"
                                                                                    clientId:@"75o3r60raslnwb"
                                             clientSecret:@"BzOmjTzrOxRH54bv"
                                                                                       state:@"DCEEFWF45453sdffef424"
                                                                               grantedAccess:@[@"r_fullprofile", @"r_network",@"r_contact_info"]];
    return [LIALinkedInHttpClient clientForApplication:application presentingViewController:nil];
}


@end