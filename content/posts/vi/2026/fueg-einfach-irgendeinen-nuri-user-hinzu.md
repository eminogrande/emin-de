---
title: "Cứ thêm một user Nuri nào đó vào"
description: "Referral, Guardian, thừa kế, Multisig và tiết kiệm chung sẽ là một tính năng duy nhất ở Nuri. Bạn thêm một username trong Settings, mọi thứ còn lại tự động theo sau."
date: "2026-10-18"
updated: "2026-10-18"
lang: vi
translated_from: "de/fueg-einfach-irgendeinen-nuri-user-hinzu"
source_sections: ["ein-feature-statt-fünf", "die-fee-wird-geteilt", "meine-mama-kriegt-17-satoshi", "expanding-statt-decaying-multisig", "guardian-und-erbe", "die-fee-liegt-im-frontend", "setz-deine-fee-selbst", "jeder-call-ist-eine-kleine-zahlung", "familienwallet-und-hardware-wallets", "der-erste-schritt"]
category: nuri
format: essay
author: emin
provenance: transcript
ai_assisted: true
reviewed_by_human: false
image: "/media/fueg-einfach-irgendeinen-nuri-user-hinzu/cover.png"
tags: ["Nuri", "Multisig", "Referral", "Inheritance", "x402", "L402"]
tldr: ["Ý tưởng của tôi cho Nuri chỉ gói gọn trong một tính năng. Bạn thêm username của ai đó trong Settings.", "Từ đó ra Referral, Guardian, thừa kế, Multisig và tiết kiệm chung, tùy bạn cho phép cái nào.", "Fee nằm ở frontend của chúng tôi, mở trong source code, và bạn tự đặt nó từ 0 đến 21 phần trăm."]
sections: [{"basically": "Ở Nuri, Referral, Guardian, thừa kế và Multisig sẽ là một tính năng duy nhất. Bạn thêm một username trong Settings."}, {"basically": "Ai thêm một người bạn vào Nuri sẽ chia fee với họ. Thêm 10 người thì fee chia cho 10."}, {"basically": "Mỗi lần thanh toán sẽ gửi vài Satoshi kèm một push notification cho người của bạn. Nhờ đó Nuri lan truyền."}, {"basically": "Với Expanding Multisig, key của các Guardian chỉ kích hoạt khi bạn mất key của chính mình."}, {"basically": "Guardian giúp bạn khôi phục key. Người thừa kế chỉ vào được khi bạn một năm không động đậy gì."}, {"basically": "Nuri không lấy fee ở các provider, mà ở frontend của chính mình, mở trong source code."}, {"basically": "Ở Nuri bạn tự đặt fee, từ 0 đến 21 phần trăm. Ở các bữa tiệc của tôi, quyên góp mang lại gấp năm lần."}, {"basically": "Mỗi API call ở Nuri sẽ là một khoản thanh toán x402 hoặc L402 nhỏ. Thế là xong chuyện fee."}, {"basically": "Multisig thì chẳng ai hiểu. Ba người và một hardware wallet thì ai cũng hiểu. Chúng tôi giải thích Nuri như vậy."}, {"basically": "Bước một ở Nuri chỉ là một người bạn trong Settings, cùng kiếm tiền. Mọi thứ khác xây trên nền đó."}]
---
Sáng nay tôi nghĩ ra được một thứ khá hay. Nó liên quan đến một tính năng cho Nuri. Ban đầu thì đó chỉ là ý tưởng thôi.

## Một tính năng thay vì năm

Tôi muốn gom Multisig, Guardians, Inheritance và Referral vào một tính năng duy nhất. Cách làm thế này. Tôi chỉ cần thêm username của bạn vào phần Settings trong app của tôi. Thế thôi.

Ngay khoảnh khắc tôi làm điều đó, bạn sẽ nhận 50 phần trăm fee mà tôi trả cho Nuri. Đồng thời bạn có thể là Guardian của tôi. Nghĩa là bạn giúp tôi khôi phục lại tài khoản trong tương lai bằng passkey của bạn. Bạn cũng có thể vào wallet với vai trò Co-Signer. Hoặc chúng ta là một công ty và muốn có một Multisig-Wallet chung.

Đó là những tính năng khác nhau hết. Nhưng tất cả đều dựa trên cùng một tính năng ở frontend. Cứ thêm một user Nuri bất kỳ vào là xong.

## Fee được chia đôi

Fee mà tôi trả cho Nuri, ban đầu chúng ta cứ đặt cố định ở mức kiểu 2,1 phần trăm. Mỗi lần tôi thực hiện một giao dịch, một nửa sẽ về Nuri và nửa còn lại về người mà tôi đã thêm vào.

Bạn cũng có thể thêm 10 username. Khi đó bạn có một wallet với 10 người, và fee sẽ được chia cho 10. Tất cả những người mới của bạn tự động nhận được một phần, và Nuri nhận một phần mười.

Tất nhiên, mọi người cũng có thể thêm lẫn nhau, khi đó tiền lại quay về tôi. Chúng ta phải cẩn thận để không tạo ra một vòng lặp ở đây. Chuyện đó tất nhiên là không được.

## Mẹ tôi nhận được 17 Satoshi

Người dùng Bitcoin luôn muốn kéo người khác trở thành Bitcoiner. Bây giờ tôi có thể mời mẹ tôi. Và bà sẽ nhận được một push notification mỗi khi tôi thực hiện một giao dịch. Bạn vừa nhận được 20 Satoshi. Bạn vừa nhận được 17 Satoshi.

Tôi biết cảm giác này từ chính bản thân mình. Ở một dịch vụ khác, tôi nhận được một tin nhắn Telegram mỗi khi có một swap diễn ra, và trong đó ghi là tôi vừa kiếm được 10 Satoshi. Đó là thứ viral nhất mà tôi từng trải nghiệm cho bản thân mình. Nó vui, và mọi người kiểu như tặng nhau một chút tiền vậy.

Với Arkade, chúng ta cũng có thể gửi qua lại 1, 2, 3, 4 hoặc 5 Satoshi mà không mất fee. Và điều đó cũng cho thấy phần nào Arkade đỉnh đến mức nào ở điểm này.

## Expanding thay vì Decaying Multisig

Những key mà chúng ta thêm vào làm điều ngược lại với những gì chúng ta thường làm ở Nuri. Nếu chúng ta không muốn chúng là signer ngay từ đầu, thì đó không phải là Decaying Multisig, mà là Expanding Multisig.

Nghĩa là, nếu tôi mất tất cả key của mình, thì sau một thời gian, một năm hoặc đại loại thế, key của các Guardian của tôi sẽ tự động được kích hoạt. Với Bitcoin thì làm được chuyện này. Với Ethereum có lẽ sẽ khó hơn, nhưng chắc chắn cũng làm được thôi.

Và rõ ràng, đó là những setting mà người dùng có thể tùy chỉnh. Không ai được phép chạm vào tiền của bạn chỉ vì bạn không động vào Bitcoin của mình trong một năm.

## Guardian và người thừa kế

Guardian là một tính năng. Tôi muốn làm nó y hệt như Bitkey. Họ đã xây dựng nó theo cách mà Guardian của bạn có thể giúp bạn khôi phục key, nhưng không có quyền truy cập vào tiền của bạn. Họ đã làm chính xác như thế nào thì chúng ta phải xem lại.

Tính năng còn lại là Inheritance, và nó cực kỳ quan trọng. Ví dụ, tôi muốn nhập chị gái tôi làm người thừa kế. Mỗi lần tôi thực hiện một giao dịch, một bộ đếm sẽ được reset về không. Và nếu có chuyện gì xảy ra với tôi, vì bất cứ lý do gì, tôi không tỉnh dậy vào sáng hôm sau, thì sau một năm chị ấy sẽ tự động được kích hoạt và có quyền truy cập vào funds của tôi. Kiểu này cực kỳ quan trọng và cực kỳ ngầu.

## Fee nằm ở frontend

Quan trọng hơn nhiều là fee nằm ở đâu. Hiện tại chúng ta thu fee ở các provider, và đó là một sai lầm. Chúng ta nên đặt fee ở các provider về không hết và thu fee ở phía chúng ta, trong frontend hoặc trong backend của chúng ta. Đằng sau Nuri có thể là mười triệu provider, hoàn toàn không quan trọng. Họ thu spread và fee của họ, và chúng ta không thu thêm gì từ họ cả.

Nhờ đó chúng ta có thể phân biệt giữa Nuri-fee và partner-fee. Đơn giản và sạch sẽ. Và tôi muốn cho mọi người thấy trong mã nguồn mở, nhìn này, đây là fee, nó nằm ngay trong sourcecode. Tôi muốn chúng ta là công ty minh bạch nhất thế giới.

Câu chuyện yêu thích của tôi về chuyện này là sự phẫn nộ trong cộng đồng Aave khi swap provider bị thay đổi ngầm ở phía sau. Từ đó có thể thấy rằng backend không còn nắm quyền lực nữa, mà là frontend. Ai nắm được người dùng, người đó có moat.

## Tự đặt fee của bạn

Chúng ta thậm chí còn để người dùng tự đặt fee. Đơn giản là vì sự công bằng. Nếu bạn không muốn trả fee, bạn có thể để 0 phần trăm. Nhưng bạn cũng có thể để 21 phần trăm nếu bạn muốn. Và nếu ai đó hỏi, tại sao các bạn thu 2 phần trăm, thì chúng ta nói, vào Settings mà chỉnh lại đi.

Tại sao tôi tin rằng cách này sẽ hiệu quả? Vì những bữa tiệc của tôi ở Berlin. Dù tôi thu vé vào cửa bao nhiêu và dù giá bia là bao nhiêu, mọi người dường như không bao giờ thấy hay. Đến một lúc chúng tôi nói, fuck it, quyên góp cho bia, quyên góp cho vé vào cửa. Chúng tôi kiếm được gấp khoảng năm lần tiền.

Khi bạn cho mọi người khả năng tự quyết định, thì cũng sẽ có những người đặt nó cao hơn hẳn. Vì họ thấy gamification hay hoặc vì họ đồng hành cùng sứ mệnh. Có người giàu và người nghèo, có kẻ keo kiệt và có những người khác. Tôi sẽ đặt fee của mình ở 21 phần trăm cho những người tôi gặp ở một hội nghị và thêm vào tài khoản của tôi. Khi đó họ tự động nhận được phần chia của tôi.

## Mỗi call là một khoản thanh toán nhỏ

Tôi còn có một ý tưởng hay hơn về cách chúng ta thu fee. Chúng ta chỉ cần gate Nuri-API bằng micropayment, và các micropayment đó chính là fee của chúng ta. Mỗi thao tác trong app sẽ tốn một khoản thanh toán nhỏ qua x402 hoặc L402. L402 nếu nó liên quan đến Bitcoin, x402 nếu nó liên quan đến crypto.

Một ví dụ. Lưu hoặc đọc một mật khẩu mới trong Nuri password manager của bạn sẽ tốn khoảng 0,1 cent hoặc 1 cent. Và chúng ta có thể lấy trực tiếp từ wallet, vì nó là agentic. Ở Router tôi đã làm như vậy rồi. Bạn có thể dùng nó bằng một token hoặc bạn trả tiền cho các call, và chúng ta có thể đặt một mức giá khác nhau cho từng endpoint.

Khi đó bạn không cần phải xây một hệ thống fee riêng. Bất kỳ ai cũng có thể tích hợp API của chúng ta vào bất cứ đâu họ muốn, và chúng ta tự động nhận được các khoản thanh toán. Tôi sẽ bắt đầu với danh bạ, 0,1 cent mỗi lần thêm một liên hệ. Nếu nó chạy tốt, chúng ta sẽ mở rộng ra toàn bộ app. Từng tính năng một.

## Wallet gia đình và hardware wallet

Khi mọi người đã trải nghiệm một lần cách một Safe-Wallet hoạt động, thứ mà chúng ta có với tư cách một công ty, họ sẽ thấy nó thực sự rất hay. Tôi có một chìa khóa, nhưng chúng ta chỉ có thể thanh toán khi cùng nhau. Đó là một trải nghiệm crypto thực sự đỉnh.

Hoặc một wallet gia đình. Mẹ tôi, chị gái tôi và tôi. Hai trong số chúng tôi là đủ để cùng thanh toán. Multisig thì không ai hình dung nổi. Nhưng nói rằng, chúng ta là ba người và một hardware wallet, hoặc chúng ta là năm người và một AI, thì ai cũng hiểu.

Và chúng ta vẫn giữ nguyên nguyên tắc mà không ai khác làm được. One-click-face-ID-wallet. Seedless, không seed phrase, chống phishing, Multisig mặc định.

## Bước đầu tiên

Chúng ta tiến tới từ từ thôi. Bước đầu tiên chỉ là tôi có thể thêm một người bạn làm Padawan của tôi trong Settings và người đó sẽ tự động nhận được một khoản gì đó. Sau đó chúng ta sẽ thấy trong database của mình ai đã thêm ai và những swap nào đã diễn ra, và trả các khoản referral.

Và khi bạn gửi một khoản gì đó, chúng ta nên có tính năng tự động hoàn thành cho tất cả user Nuri. Không chỉ danh bạ của bạn, mà là tất cả. Tôi gõ L và tìm thấy tất cả những người có chữ L, giống như ở PayPal.

Sau này sẽ có key rotation, thêm key và xóa key và một hardware wallet nữa. Dù sao thì chúng ta cũng phải làm tất cả những thứ đó. Nhưng về tầm nhìn, tôi nghĩ nó hoàn toàn hoàn hảo. Vì đó là một tính năng viral khủng khiếp đến mức bạn có thể kiếm tiền cùng người khác hoặc là co-signer của họ.
