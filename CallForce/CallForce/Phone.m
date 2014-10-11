#import "Phone.h"

@implementation Phone

// … unchanged code omitted for brevity

-(id)init
{
    if ( self = [super init] )
    {
        NSURL* url = [NSURL URLWithString:@"http://google.com"];
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
                capabilityToken = @"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzY29wZSI6InNjb3BlOmNsaWVudDppbmNvbWluZz9jbGllbnROYW1lPWNhbGxGb3JjZSBzY29wZTpjbGllbnQ6b3V0Z29pbmc_YXBwU2lkPUFQNTJmMWJjOTIyMDk0N2FhNTZmNmY1ZDQ0NDVlMmVjYjYmY2xpZW50TmFtZT1jYWxsRm9yY2UiLCJpc3MiOiJBQ2NmMmNhY2Y3ODU5NGE0NmM3MDYyNDk5N2JlZmViMjVhIiwiZXhwIjoxNDEzMDYwOTI4fQ.zKj1c_CrGv9PtTe1ikERd0ZKBycGPBU0b1J9CJ0BVvM";
                
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