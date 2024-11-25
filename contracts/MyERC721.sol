// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title MyERC721
 * @dev ERC721 Токен с возможностью покупки и отображением метаданных.
 */
contract MyERC721 is ERC721URIStorage, Ownable {
    uint256 public tokenCounter;
    uint256 public price = 0.05 ether;

    /**
     * @notice Конструктор контракта токена, задающий имя токена, владельца.
     */
    constructor() ERC721("MyNFT", "MNFT") Ownable(msg.sender) {
        tokenCounter = 0;
    }

    /**
     * @notice Минтует NFT к переданному адресу.
     * @param to Передаваыемый адрес для минтирования.
     */
    function mint(address to) external onlyOwner {
        uint256 tokenId = tokenCounter;
        _safeMint(to, tokenId);
        tokenCounter += 1;
    }

    /**
     * @notice Предоставляет возможность купить токен за эфир.
     * @dev Проверяет на достаточный баланс.
     */
    function buyNFT() external payable {
        require(msg.value >= price, "Not enough ETH to buy NFT");
        uint256 tokenId = tokenCounter;
        _safeMint(msg.sender, tokenId);
        tokenCounter += 1;
    }
}
