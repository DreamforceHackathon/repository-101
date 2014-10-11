#import "Phone.h"

@implementation Phone

// … unchanged code omitted for brevity

-(id)init
{
    if ( self = [super init] )
    {
        NSURL* url = [NSURL URLWithString:@"http://companyfoo.com/auth.php"];
        NSURLResponse* response = nil;
        NSError* error = nil;
        NSData* data = [NSURLConnection sendSynchronousRequest:
                        [NSURLRequest requestWithURL:url]
                                             returningResponse:&response
                                                         error:&error];
        if (data)
        {
            NSHTTPURLResponse* httpResponse = (NSHTTPURLResponse*)response;
            
            if (httpResponse.statusCode == 200)
            {
                NSString* capabilityToken =
                [[NSString alloc] initWithData:data
                                       encoding:NSUTF8StringEncoding];
                
                _device = [[TCDevice alloc] initWithCapabilityToken:capabilityToken
                                                           delegate:nil];
            }
            else
            {
                NSString*  errorString = [NSString stringWithFormat:
                                          @"HTTP status code %d",
                                          httpResponse.statusCode];
                NSLog(@"Error logging in: %@", errorString);
            }
        }
        else
        {
            NSLog(@"Error logging in: %@", [error localizedDescription]);
        }
    }
    return self;
}


-(void)connect:(NSString*)phoneNumber
{
    NSDictionary* parameters = nil;
    if ( [phoneNumber length] > 0 )
    {
        parameters = [NSDictionary dictionaryWithObject:phoneNumber forKey:@"PhoneNumber"];
    }
    _connection = [_device connect:parameters delegate:nil];
}

-(void)disconnect
{
    [_connection disconnect];
    _connection = nil;
}

@end