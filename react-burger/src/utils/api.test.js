import {getResponse, sendOrderRequest} from "./API";

describe('Response utils',()=>{
    const mockResponse = (ok, data=null, error=null) => ({
        ok,
        json: () => {
            if (ok) {
                return 'response ok';
            } else {
                return Promise.reject(error);
            }
        },
    });
    it('should be Ok when get response SUCCESS', ()=>{
        expect( getResponse(mockResponse(true, 'response ok'))).toEqual('response ok')
    })
    it ('should be with error when get response FAILED',()=>{
        expect(getResponse(mockResponse(false,null, 'error'))).rejects.toEqual('error')
    })
})

describe('send order request',()=>{
    beforeEach(()=>{
        jest.spyOn(global,"fetch").mockResolvedValue({
            json:()=>({result:'ok', number:123}),
            ok:true
        })
    })
    afterEach(()=>{
        jest.resetAllMocks()
    })
    it('should be successful with order number',  async () =>{
        const result = await sendOrderRequest([1,2,3,4])
        expect(result).toEqual({result:'ok', number:123})
    });
    it('should rejects with error',  async () =>{
        fetch.mockImplementationOnce(()=>{
           return Promise.resolve({
                ok:false,
               json: () => Promise.resolve('error')
            })
        })
        expect(sendOrderRequest([1,2,3,4])).rejects.toEqual('error')
    });
})