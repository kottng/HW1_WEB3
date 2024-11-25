// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title MyERC1155
 * @dev ERC1155 Token with metadata and ownership
 */
contract MyERC1155 is ERC1155, Ownable {
    uint256 public price = 0.01 ether;

    /**
     * @dev Конструктор контракта токена с адресом владельца.
     * @param initialOwner Адрес владельца.
     */
    constructor(address initialOwner) ERC1155("") Ownable(initialOwner) {}

    /**
     * @notice Минтует NFT к переданному адресу.
     * @dev Функция может быть вызвана только владельцем.
     * @param to Передаваемый адрес получателя для минтирования.
     * @param id ID токена.
     * @param amount Количество токенов для минтирования.
     * @param data Дополнительная информация.
     */
    function mint(address to, uint256 id, uint256 amount, bytes memory data) external onlyOwner {
        _mint(to, id, amount, data);
    }

    /**
     * @notice Предоставляет возможность для покупки токена за ETH. 
     * @dev Метод доступен для любого пользователя, требует определенного количество пересылаемых ETH.
     * @param id ID покупаемого токена.
     * @param amount Количество токенов для покупки.
     */
    function buyTokens(uint256 id, uint256 amount) external payable {
        require(msg.value >= price * amount, "Not enough ETH to buy tokens");
        _mint(msg.sender, id, amount, "");
    }
}
