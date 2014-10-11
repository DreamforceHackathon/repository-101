#import "TCDevice.h"
#import "TCConnection.h"

@interface Phone : NSObject
{
@private
    TCDevice* _device;
    TCConnection* _connection;
}

-(void)connect:(NSString *) phoneNumber;
-(void)disconnect;

@end