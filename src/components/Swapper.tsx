import Box from './Box'
import SwapIcon from './SwapIcon'
import { tokens } from './tokens'

const Swapper : React.FC<any> = ({handleInputMintShow,listShow, onChange, setListShow, inputMint, outputMint, setOutputMint, setInputMint, inAmount , outAmount}) => {
    const handleSwapIcon = () => {
        const temp = inputMint;
        setInputMint(outputMint);
        setOutputMint(temp);
    }
    return (
        <div className={`flex relative w-fit flex-col justify-center items-center rounded-xl`}>
            <Box handleInputMintShow={handleInputMintShow} forData={"input"} onChange={onChange} value={inAmount} setListShow={setListShow} tokenData={tokens[inputMint]} >
                You're Selling
            </Box>
            <div className='relative w-full flex justify-center items-center'>
                <hr className='w-[90%] absolute top-1/2 max-sm:top-[53%] border-[#131B24] '  />
                <SwapIcon onClick={handleSwapIcon}/>
            </div>
            <Box handleInputMintShow={handleInputMintShow} inAmount={inAmount} forData={"output"} value={outAmount} listShow={listShow} setListShow={setListShow} tokenData={tokens[outputMint]} >
                You're Buying
            </Box>
        </div>
    )
}

export default Swapper